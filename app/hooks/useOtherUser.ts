import { useSession } from "next-auth/react";
import { User } from "../generated/prisma/client";
import { useMemo } from "react";

const useOtherUser = (
    conversation: any
): User => {
    const session = useSession();

    const otherUser = useMemo(() => {
        const currentUserEmail = session.data?.user?.email;

        const otherUser = conversation.users?.filter(
            (user: User) => user.email !== currentUserEmail
        ) || [];

        return otherUser[0];
    }, [session.data?.user?.email, conversation.users]);

    return otherUser;
};

export default useOtherUser;