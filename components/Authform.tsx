'use client'

import React, { useEffect } from 'react'
import {useState, useCallback} from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import Input from './Input/Input'
import Button from './Input/Button'
import AuthSocialButton from './Input/AuthSocialButton'
import {BsGithub, BsGoogle} from 'react-icons/bs'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Variant = 'LOGIN' | 'REGISTER'

function Authform() {
    const session = useSession() 
    const router = useRouter()
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsloading] = useState(false)
    useEffect(()=>{
      if(session?.status ==='authenticated'){
        router.push('/users')
      }
    },[session?.status, router])
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
        axios.post('/api/register', data)
        .then(()=>signIn('credentials', data))
        .catch(()=> toast.error('Ada Sesuatu Yang Salah'))
        .finally(() => setIsloading(false))
      }
      if(variant === 'LOGIN'){
        signIn('credentials', {
          ...data,
          redirect: false
        })
        .then((e)=>{
          if(e?.error){
            toast.error('Terjadi Kesalahan')
          }
          if(e?.ok && !e?.error){
            toast.success('Sukses login')
            router.push('/users')
          }
        })
        .finally(()=> setIsloading(false))
      }
    }

    function socialAction(action: string){
      setIsloading(true)
      signIn(action, {
        redirect: false
      })
      .then((e)=>{
        if(e?.error){
          toast.error('Terjadi Kesalahan')
        }
        if(e?.ok && !e?.error){
          toast.success('Berhasil Login')
        }
      })
      .finally(()=>setIsloading(false))
    }

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input id="name" label='Nama' errors={errors} register={register} disabled={isLoading} />
          )}
          <Input id="email" label='Masukan Email Anda' type='email' errors={errors} register={register} disabled={isLoading} />
          <Input id="password" label='Masukan password anda' type='password' errors={errors} register={register} disabled={isLoading} />
          <div>
            <Button disabled={isLoading} fullwidth type='submit'>{variant === 'LOGIN' ? 'Sign in' : 'Register'}</Button>
          </div>
        </form>
        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-gray-500'>
                Atau Masuk Dengan
              </span>
            </div>
          </div>
          <div className='mt-6 flex gap-2'>
            <AuthSocialButton icon={BsGithub} onClick={()=>socialAction('github')} />
            <AuthSocialButton icon={BsGoogle} onClick={()=>socialAction('google')} />
          </div>
        </div>
        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
          <div>
            {variant === 'LOGIN' ? 'Chat Baru?' : 'Sudah Punya Akun?'}
          </div>
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === 'LOGIN' ? 'Buat Akun Anda': 'Langsung Login'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authform