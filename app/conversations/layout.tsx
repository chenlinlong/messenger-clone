import React from "react"
import Sidebar from "../components/sidebar/Sidebar";
import getConversations from "../actions/getConversations";
import ConversationList from "./components/ConversationList";
import getUser from "../actions/getUsers";


const ConversationLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const conversations = await getConversations();
    const users = await getUser();    

    return (
        <Sidebar>
            <div className="h-full bg-gray-100 lg:bg-white">
                <ConversationList users={users} initialItems={conversations}></ConversationList>
                {children}
            </div>
        </Sidebar>
    )
}

export default ConversationLayout;