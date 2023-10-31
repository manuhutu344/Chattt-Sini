'use client'

import React from 'react'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Conversation, Message, User} from '@prisma/client'
import {format} from 'date-fns'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { FullConversationType } from '@/app/types'
import useOtherUser from '@/app/hooks/useOtherUser'
import Avatar from './Avatar'

interface Props{
    data: FullConversationType
    selected?: boolean 
}

function ConversationBox({data, selected}:Props) {
    const otherUser = useOtherUser(data)
    const session = useSession()
    const router = useRouter()
    const handleClick = useCallback(()=>{
        router.push(`/conversations/${data.id}`)
    }, [data.id, router])
    const lastMessages = useMemo(()=>{
        const messages = data.messages || []
        return messages[messages.length - 1]
    },[data.messages])
    const userEmail = useMemo(()=>{
        return session.data?.user?.email
    },[session.data?.user?.email])
    const hasSeen = useMemo(()=>{
        if(!lastMessages){
            return false
        }
        const seenArray = lastMessages.seen || []
        if(!userEmail){
            return false
        }
        return seenArray.filter((user)=>user.email === userEmail).length !== 0
    },[userEmail, lastMessages])
    const lastMessageText = useMemo(()=>{
        if(lastMessages?.image){
            return 'Gambar Terkirim'
        }
        if(lastMessages?.body){
            return lastMessages.body
        }
        return "Mulai Percakapan"
    },[lastMessages])
  return (
    <div className={clsx(`w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3`, selected ? 'bg-neutral-100' : 'bg-white')} onClick={handleClick}>
        <Avatar user={otherUser} />
        <div className='min-w-0 flex-1'>
            <div className='focus:outline-none'>
                <div className='flex justify-between items-center mb-1'>
                    <p className='text-md font-medium text-gray-900'>
                        {data.name || otherUser.name}
                    </p>
                    {lastMessages?.createdAt && (
                        <p className='text-xs text-gray-400 font-light'>
                            {format(new Date(lastMessages.createdAt), 'p')}
                        </p>
                    )}
                </div>
                <p className={clsx(`truncate text-sm`, hasSeen ? 'text-gray-500' : 'text-black font-medium')}>
                    {lastMessageText}
                </p>
            </div>
        </div>
    </div>
  )
}

export default ConversationBox