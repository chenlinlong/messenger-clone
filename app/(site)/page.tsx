import Image from "next/image";
import AuthForm from "./components/authForm";

export default function Home() {
    return (
        <div
            className="
      flex
      min-h-full
      py-12
      sm:px-6
      lg:px-8
      justify-center
      bg-gray-100
      ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image alt="logo" width="80" height="80" className="mx-auto w-auto" src="/images/logo.png"
                />
                <h2 className="
                mt-6
                text-center
                text-3xl
                font-bold
                tracking-tight
                text-gray-900
                ">
                    sign in to your account
                </h2>
                <AuthForm></AuthForm>

            </div>
        </div>
    );
}
