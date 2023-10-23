import Sidebar from "@/components/sidebar/Sidebar"

interface Props{
    children: React.ReactNode
}

export default async function UsersLayout({
    children
}:Props){
    return(
        <Sidebar>
        <div className="h-full">
            {children}
        </div>
        </Sidebar>
    )
}