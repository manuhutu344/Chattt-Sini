'use client'

import { Conversation } from '@prisma/client'
import React from 'react'

interface Props{
    initialItems: Conversation[]
}

function ConversationList({initialItems}:Props) {
  return (
    <div>ConversationList</div>
  )
}

export default ConversationList