'use client'

import React from 'react'

interface Props{
    label: string
    value?: Record<string, any>
    onChange: (value: Record<string, any>) => void
    options: Record<string, any>[]
    disabled?: boolean
}

function Select({label, value, onChange, options, disabled}:Props) {
  return (
    <div className='z-[100]'>
        Select
    </div>
  )
}

export default Select