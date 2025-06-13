'use client';

import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import { User } from "@/app/generated/prisma";
import GroupChatModal from "./GroupChatModal";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationListProps {
    initialItems: any;
    users: User[]
}

const ConversationList: React.FC<ConversationListProps> = ({
    users,
    initialItems
}) => {
    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { conversationId, isOpen } = useConversation();

    const session = useSession();

    const pusherKey = useMemo(() => {
        return session?.data?.user?.email;
    }, [session?.data?.user?.email]);

    useEffect(() => {
        if (!pusherKey) {
            return;
        }

        const channel = pusherClient.subscribe(pusherKey);

        const newHandler = (newConversation: any) => {
            setItems((current: any) => {
                if (!find(current, { id: newConversation?.id })) {
                    return [newConversation, ...current]
                }
                return current;
            });
        }
        const updateHandler = (updatedConversation: any) => {
            setItems((current: any) => current.map((conversation: any) => {
                if (conversation.id === updatedConversation.id) {
                    conversation.messages = updatedConversation.messages;
                }
                return conversation;
            }));
        }

        const deleteHandler = (deletedConversation: any) => {
            if (!deletedConversation.result) {
                return;
            }
            setItems((current: any[]) => current.filter(({ id }) => id !== deletedConversation.id));
        }

        channel.bind('conversation:new', newHandler);
        channel.bind('conversation:update', updateHandler);
        channel.bind('conversation:delete', deleteHandler);

        return () => {
            pusherClient.unsubscribe(pusherKey);
            channel.unbind('conversation:new', newHandler);
            channel.unbind('conversation:update', updateHandler);
            channel.unbind('conversation:delete', deleteHandler);

        }
    }, [pusherKey]);

    return (
        <>
            <GroupChatModal users={users} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}></GroupChatModal>
            <aside
                className={clsx(
                    `
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        border-r
        border-gray-200
        overflow-y-auto
      `,
                    isOpen ? 'hidden' : 'block w-full left-0'
                )}
            >
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-neutral-800">
                            Messages
                        </div>
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="
              rounded-full
              p-2
              bg-gray-100
              text-gray-600
              cursor-pointer
              hover:opacity-75
              transition
            "
                        >
                            <MdOutlineGroupAdd size={20} />
                        </div>
                    </div>
                    {items?.map((item: User) => (
                        <ConversationBox
                            key={item.id}
                            data={item}
                            selected={conversationId === item.id}
                        />
                    ))}
                </div>
            </aside>
        </>

    )
}

export default ConversationList;