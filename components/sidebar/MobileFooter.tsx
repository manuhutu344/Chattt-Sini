"use client"

import useConversation from '@/app/hooks/useConversation'
import useRoutes from '@/app/hooks/useRoutes'
import React from 'react'
import MobileItem from './MobileItem'

function MobileFooter() {
    const routes = useRoutes()
    const {isOpen} = useConversation()
    if(isOpen){
        return null
    }
  return (
    <div className='fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden'>
        {routes.map((hi)=>(
            <MobileItem key={hi.href} href={hi.href} active={hi.active} icon={hi.icon} onClick={hi.onClick} />
        ))}
    </div>
  )
}

export default MobileFooter