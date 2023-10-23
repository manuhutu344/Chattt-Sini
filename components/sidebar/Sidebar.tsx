import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'

interface Props{
    children: React.ReactNode
}

async function Sidebar({children}:Props) {
  return (
    <div className='h-full'>
        <DesktopSidebar />
        <MobileFooter />
        <main className='lg:pl-20 h-full'>
            {children}
        </main>
    </div>
  )
}

export default Sidebar