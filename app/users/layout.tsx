import getUser from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";

interface UserLayoutProps {
    children: React.ReactNode;
}

export default async function UserLayout({
    children
}: UserLayoutProps) {
    const users = await getUser();
    return (
        <Sidebar>
            <div className="h-full bg-gray-100 lg:bg-white">
                <UserList items={users}></UserList>
                {children}
            </div>
        </Sidebar>
    )
}