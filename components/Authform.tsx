'use client'

import React from 'react'
import {useState, useCallback} from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import Input from './Input/Input'
import Button from './Input/Button'

type Variant = 'LOGIN' | 'REGISTER'

function Authform() {
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsloading] = useState(false)
    const toggleVariant = useCallback(()=>{
        if(variant === 'LOGIN'){
            setVariant('REGISTER')
        }else{
          setVariant('LOGIN')
        }
    }, [variant])

    const {
      register,
      handleSubmit,
      formState: {
        errors
      }
    } = useForm<FieldValues>({
      defaultValues: {
        name: '',
        email: '',
        password: ''
      }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
      setIsloading(true)
      if(variant === 'REGISTER'){

      }
      if(variant === 'LOGIN'){

      }
    }

    function socialAction(action: string){
      setIsloading(true)
    }

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input id="name" label='Nama' errors={errors} register={register}/>
          )}
          <Input id="email" label='Masukan Email Anda' type='email' errors={errors} register={register}/>
          <Input id="password" label='Masukan password anda' type='password' errors={errors} register={register}/>
          <div>
            <Button>Pencet Untuk Login</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Authform