'use client'

import React from 'react'
import clsx from 'clsx'
import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form'

interface Props{
    label: string
    id: string
    type?: string
    required?: boolean
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean
}

function Input ({label, id, type, required, register, errors, disabled}:Props) {
  return (
    <div>
        <label htmlFor={id} className='block text-sm font-medium leading-6 text-gray-900'>
            {label}
        </label>
    </div>
  )
}

export default Input