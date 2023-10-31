import prisma from "@/app/libs/prismadb"


async function getMessages(conversationId: string) {
    try {
        const message = await prisma.message.findMany({
            where:{
                conversationId: conversationId
            },
            include:{
                sender: true,
                seen: true
            },
            orderBy:{
                createdAt: 'asc'
            }
        })
        return message
    } catch (error:any) {
        return []
    }
}

export default getMessages