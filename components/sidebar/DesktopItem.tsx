'use client'

import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

interface Props{
    label: string
    icon: any
    href: string
    onClick? : () => void
    active?: boolean
}

function DesktopItem({label, icon: Icon, href, onClick, active}:Props) {
    function handleClick(){
        if(onClick){
            return onClick()
        }
    }
  return (
    <li onClick={handleClick}>
        <Link href={href}>
            <Icon className='h-6 w-6 shrink-0' />
        <span>
            {label}
        </span>
        </Link>
    </li>
  )
}

export default DesktopItem