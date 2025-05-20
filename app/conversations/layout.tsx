import React from "react"
import Sidebar from "../components/sidebar/Sidebar";
import getConversations from "../actions/getConversations";
import ConversationList from "./components/ConversationList";


const ConversationLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const conversations = await getConversations();
    console.log(conversations, 'conversations');

    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList initialItems={conversations}></ConversationList>
                {children}
            </div>
        </Sidebar>
    )
}

export default ConversationLayout;