'use client';
import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";

interface DesktopSidebarProps {
    currentUser: any
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
    currentUser
}) => {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <SettingsModal isOpen={isOpen} currentUser={currentUser} onClose={() => setIsOpen(false)}></SettingsModal>
            <div
                className="
                        flex
                        flex-row
                        justify-around
                        fixed
                        bottom-0
                        pb-4
                        px-6
                        inset-x-0
                        z-40
                        bg-white
                        border-t-[1px]
                        h-20
                        border-t-gray-200
                        lg:border-t-[0px]
                        lg:h-auto
                        lg:inset-y-0
                        lg:left-0
                        lg:w-20
                        lg:overflow-y-auto
                        lg:border-r-[1px]
                        lg:flex-col
                        lg:justify-between
                        lg:border-r-gray-200"
            >
                <nav
                    className="
            mt-4
            flex
            flex-row
            lg:flex-col
            justify-between
            items-center
            "
                >
                    <ul
                        role="list"
                        className="flex flex-row lg:flex-col justify-center items-center lg:space-y-1"
                    >
                        {routes.map((item) => (
                            <DesktopItem
                                key={item.label}
                                label={item.label}
                                href={item.href}
                                icon={item.icon}
                                active={item.active}
                                onClick={item.onClick}
                            ></DesktopItem>
                        ))}
                    </ul>
                </nav>
                <nav className="mt-4 flex flex-row lg:flex-col justify-between items-center">
                    <div onClick={() => setIsOpen(true)}
                        className="cursor-pointer hover:opacity-75 transition">
                        <Avatar user={currentUser}></Avatar>
                    </div>
                </nav>
            </div>
        </>

    )
}
export default DesktopSidebar;