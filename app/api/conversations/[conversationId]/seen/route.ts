import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"

interface Props{
    conversationId?: string
}

export async function POST(request: Request, {params}: {params: Props}){
    try {
      const currentUser = await getCurrentUser()
      const {conversationId} = params
      if(!currentUser?.id || !currentUser?.email){
        return new NextResponse('Tidak Terifikasi', {status: 401})
      } 
      const conversation = await prisma.conversation.findUnique({
        where: {
            id: conversationId
        },
        include: {
            messages: {
                include: {
                    seen: true,
                }
            },
            users: true,
        }
      })
      if(!conversation){
        return new NextResponse('ID Tidak Valid', {status: 400})
      }
      const lastMessage = conversation.messages[conversation.messages.length - 1]
      if(!lastMessage){
        return NextResponse.json(conversation)
      }
      const updateMessage = await prisma.message.update({
        where: {
            id: lastMessage.id
        },
        include: {
            sender: true,
            seen: true
        },
        data: {
            seen:{
                connect: {
                    id: currentUser.id
                }
            }
        }
      })
      return NextResponse.json(updateMessage)

    } catch (error: any) {
        console.log(error, 'ERROR di route.ts conversationId')
        return new NextResponse('Error di Internal conversationId', {status: 500})
    }
}