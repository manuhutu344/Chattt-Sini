"use client"

import { User } from '@prisma/client'
import React, { useState } from 'react'
import {useRouter} from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import Modal from './Modal'

interface Props{
    isOpen?: boolean
    onClose: () => void
    currentUser: User
}

function SettingsModal({isOpen, onClose, currentUser}:Props) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, setValue, watch, formState:{
        errors,    
    }} = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image
        }
    })
    const image = watch('image')

    function handleUpload(result:any){
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)
        axios.post('/api/settings', data)
        .then(()=>{
            router.refresh()
            onClose()
        })
        .catch(()=>toast.error('Terjadi Kesalahan'))
        .finally(()=>setIsLoading(false))
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-12'>
                <div className='border-b border-gray-900/10 pb-12'>
                    <h2 className='text-base font-semibold'>
                        Profil
                    </h2>
                </div>
            </div>
        </form>
    </Modal>
  )
}

export default SettingsModal