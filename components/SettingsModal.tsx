"use client"

import { User } from '@prisma/client'
import React, { useState } from 'react'
import {useRouter} from 'next/navigation'
import { FieldValues, useForm } from 'react-hook-form'

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

  return (
    <div>SettingsModal</div>
  )
}

export default SettingsModal