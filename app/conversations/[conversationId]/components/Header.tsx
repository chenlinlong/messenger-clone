'use client';
import Avatar from "@/app/components/Avatar"
import { Conversation, User } from "@/app/generated/prisma"
import useOtherUser from "@/app/hooks/useOtherUser"
import Link from "next/link"
import { useMemo } from "react"
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2"

interface HeaderProps {
    conversation: any
}

const Header: React.FC<HeaderProps> = ({
    conversation
}: HeaderProps) => {
    const otherUser = useOtherUser(conversation);
    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation?.users?.length} members`;
        }
        return 'Active';
    }, [conversation]);

    return (
        <div className="bg-white w-full flex sm:px-4 py-3 px-4 justify-between items-center shadow-sm">
            <div className="flex gap-3 items-center">
                <Link href="/conversations" className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer">
                    <HiChevronLeft size={32} />
                </Link>
                <Avatar user={otherUser} />
                <div className="flex flex-col">
                    <div>{conversation?.name || otherUser?.name}</div>
                    <div className="text-sm font-light text-neutral-500">
                        {statusText}
                    </div>
                </div>
            </div>
            <HiEllipsisHorizontal
                size={32}
                onClick={() => { }}
                className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
            />
        </div>
    )
}

export default Header;