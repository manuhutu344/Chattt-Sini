'use client'

import React from 'react'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Conversation, Message, User} from '@prisma/client'
import {format} from 'date-fns'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { FullConversationType } from '@/app/types'

interface Props{
    data: FullConversationType
    selected?: boolean 
}

function ConversationBox({data, selected}:Props) {
  return (
    <div>ConversationBox</div>
  )
}

export default ConversationBox