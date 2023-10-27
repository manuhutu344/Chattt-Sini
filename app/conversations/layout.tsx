import ConversationList from "@/components/ConversationList"
import Sidebar from "@/components/sidebar/Sidebar"
import getConversations from "../actions/getConversations"

interface Props{
    children: React.ReactNode
}

export default async function ConversationsLayout({children}:Props){
    const conversations = await getConversations()
    return(
        <Sidebar>
            <div className="h-full">
                <ConversationList initialItems={conversations} />
                {children}
            </div>
        </Sidebar>
    )
}