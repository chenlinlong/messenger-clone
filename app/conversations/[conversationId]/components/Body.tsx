'use client';

import useConversation from "@/app/hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

const Body: React.FC<{
    initialMessages: any
}> = ({ initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`);
    }, [conversationId]);
    return (
        <div className="flex-1 overflow-y-auto">
            {messages?.map((message: any, i: number) => (
                <MessageBox
                    isLast={i === messages.length - 1}
                    key={message.id}
                    data={message}
                ></MessageBox>
            ))}
            <div ref={bottomRef} className="pt-24"></div>
        </div>
    )
}

export default Body