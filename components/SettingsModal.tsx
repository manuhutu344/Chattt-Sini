"use client"

import { User } from '@prisma/client'
import React, { useState } from 'react'
import {useRouter} from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import Modal from './Modal'
import Input from './Input/Input'
import Image from 'next/image'
import { CldUploadButton } from 'next-cloudinary'
import Button from './Input/Button'

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
                    <h2 className='text-base font-semibold leading-7 text-gray-900'>
                        Profil
                    </h2>
                    <p className='mt-1 text-sm leading-6 text-gray-600'>
                        Tuliskan Informasi Tentang Anda
                    </p>
                    <div className='mt-10 flex flex-col gap-y-8'>
                        <Input disabled={isLoading} label='name' id='name' errors={errors} required register={register} />
                        <div>
                            <label className='block text-sm font-medium leading-6 text-gray-900'>
                                Foto
                            </label>
                            <div className='mt-2 flex items-center gap-x-3'>
                                <Image width={48} height={48} className='rounded-full' src={image || currentUser?.image || '/image/placeholder.jpg'} alt='Avatar' />
                                <CldUploadButton options={{maxFiles: 1}} onUpload={handleUpload} uploadPreset='kczgrefy'>
                                    <Button disabled={isLoading} secondary type='button'>
                                        Rubah Gambar Anda
                                    </Button>
                                </CldUploadButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-6 flex items-center justify-end gap-x-6'>
                    <Button disabled={isLoading} secondary onClick={onClose}>
                        Tidak Jadi
                    </Button>
                    <Button disabled={isLoading} type='submit'>
                        Iya Jadi
                    </Button>
                </div>
            </div>
        </form>
    </Modal>
  )
}

export default SettingsModal