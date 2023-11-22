import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from '@/app/libs/prismadb'

interface Props{
    conversationId?: string
}

export async function DELETE(request: Request, {params}:{params:Props}){
    try {
        const {conversationId} = params
        const currentUser = await getCurrentUser()
        if(!currentUser?.id){
            return new NextResponse('Tidak Ada User Ini', {status: 401})
        }
        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })
        if(!existingConversation){
            return new NextResponse('Id Tidak Valid', {status: 400})
        }
        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        })
        return NextResponse.json(deletedConversation)
    } catch (error: any) {
        console.log(error, 'ERROR Di conversationId DELETE')
        return new NextResponse('Error Internal', {status: 500})
    }
}