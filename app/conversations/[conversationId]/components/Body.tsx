'use client';

import useConversation from "@/app/hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

const Body: React.FC<{
    initialMessages: any
}> = ({ initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`);
    }, [conversationId]);

    useEffect(() => {
        const channel = pusherClient.subscribe(conversationId);
        bottomRef?.current?.scrollIntoView();

        const messageHandler = (message: any) => {            
            axios.post(`/api/conversations/${conversationId}/seen`);

            setMessages((current: any) => {
                if (find(current, { id: message?.id })) {
                    return current;
                }

                return [ ...current, message ]
            });
            bottomRef?.current?.scrollIntoView();
        }

        const updateMessageHandler = (newMessage: any) => {
            setMessages((current: any) => current.map((currentMessage: any) => {
                if (currentMessage.id === newMessage.id) {
                    return newMessage;
                }

                return currentMessage;
            }));
        }

        channel.bind('message:new', messageHandler);
        channel.bind('message:update', updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId);
            channel.unbind('message:new', messageHandler);
            channel.unbind('message:update', updateMessageHandler);
        }
    }, [conversationId])
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