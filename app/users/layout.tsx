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
            <div className="h-full">
                <UserList items={users}></UserList>
            </div>
        </Sidebar>
    )
}