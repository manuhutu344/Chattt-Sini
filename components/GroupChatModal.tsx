'use client'

import { User } from '@prisma/client'
import React, { useState } from 'react'
import {useRouter} from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import Modal from './Modal'
import Input from './Input/Input'
import Select from './Select'
import Button from './Input/Button'

interface Props{
    isOpen?: boolean
    onClose: ()=>void
    users: User[] 
}

function GroupChatModal({isOpen, onClose, users}:Props) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, setValue, watch, formState:{
        errors
    }} = useForm<FieldValues>({
        defaultValues:{
            name: '',
            members: []
        }
    })
    const members = watch('members')
    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)
        axios.post('/api/conversations', {
            ...data, 
            isGroup: true
        })
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
                        Buat Grup Chat Kalian
                    </h2>
                    <p className='mt-1 text-sm leading-6 text-gray-600'>
                        Buat Tempat Mengobrol Lebih Dari 2 Orang
                    </p>
                    <div className='mt-10 flex flex-col gap-y-8'>
                        <Input register={register} label='Nama' id='name' disabled={isLoading} required errors={errors} />
                        <Select disabled={isLoading} label="Anggota" options={users.map((user)=>({
                            value: user.id,
                            label: user.name
                        }))} onChange={(value)=>setValue('members', value, {
                            shouldValidate: true
                        })} value={members} />
                    </div>
                </div>
            </div>
            <div className='mt-6 flex items-center justify-end gap-x-6'>
                <Button disabled={isLoading} onClick={onClose} type='button' secondary>
                    Tidak Jadi
                </Button>

                <Button disabled={isLoading} type='submit'>
                    Jadi Membuat Grup
                </Button>
            </div>
        </form>
    </Modal>
  )
}

export default GroupChatModal