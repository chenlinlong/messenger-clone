'use client';

import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import { User } from "@/app/generated/prisma";

interface ConversationListProps {
    initialItems: any;
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialItems
}) => {
    const [items, setItems] = useState(initialItems);
    const router = useRouter();
    const { conversationId, isOpen } = useConversation();

    return (
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
                {items.map((item: User) => (
                    <ConversationBox
                        key={item.id}
                        data={item}
                        selected={conversationId === item.id}
                    />
                ))}
            </div>
        </aside>
    )
}

export default ConversationList;