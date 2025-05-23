import { User } from "../generated/prisma";
import Image from "next/image";

const Avatar: React.FC<{
    user: User
}> = ({
    user
}) => {
        return (
            <div className="relative">
                <div
                    className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11
                    md:w-11"
                >
                    <Image alt="Avatar" src={user?.image || '/images/placeholder.jpg'} fill sizes="18" />
                </div>
                <span
                    className="
                    absolute
                    block
                    rounded-full
                    bg-green-500
                    ring-2
                    ring-white
                    top-0
                    right-0
                    h-2
                    w-2
                    md:h-2
                    md:w-2
                    "
                ></span>
            </div>
        )
    }

export default Avatar;