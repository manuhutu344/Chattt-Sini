import getConversationById from '@/app/actions/getConversationById'
import getMessages from '@/app/actions/getMessages'
import Body from '@/components/Body'
import EmptyState from '@/components/EmptyState'
import Form from '@/components/Form'
import Header from '@/components/Header'
import React from 'react'

interface Props{
    conversationId: string
}

async function page({params}:{params : Props}) {
  const conversation = await getConversationById(params.conversationId)
  const messages = await getMessages(params.conversationId)
  if(!conversation){
    return(
      <div className='lg:pl-80 h-full'>
        <div className='h-full flex flex-col'>
          <EmptyState />
        </div>
      </div>
    )
  }
  return (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation} />
        <Body initialMessages={messages}  />
        <Form />
      </div>
    </div>
  )
}

export default page