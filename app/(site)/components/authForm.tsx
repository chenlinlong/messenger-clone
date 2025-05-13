"use client"
import Button from "@/app/components/Button";
import Input from "@/app/components/input/input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const router = useRouter();
    const session = useSession();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users');
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        setVariant(prev => prev === 'LOGIN' ? 'REGISTER' : 'LOGIN');
    }, []);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            // Axois Register
            axios.post('/api/register', data)
                .then(() => signIn('credentials', data))
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => setIsLoading(false))
        } else if (variant === 'LOGIN') {
            // NextAuth SignIn
            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid credentials');
                    } else if (callback?.ok) {
                        toast.success('Logged in!')
                        router.push('/users');
                    }
                })
                .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);
        // NextAuth Social Sign in 
        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid credentials');
                } else if (callback?.ok) {
                    toast.success('Logged in!')
                    router.push('/users');
                }
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                {/* form start */}
                <form className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {
                        variant === 'REGISTER' && (
                            <Input id="name" label="Name" register={register} errors={errors} />
                        )
                    }
                    <Input id="email" label="Email" type="email" register={register} errors={errors} />
                    <Input id="password" label="Password" type="password" register={register} errors={errors} />
                    <Button
                        disabled={isLoading}
                        fullWidth={true}
                        type="submit"
                    >
                        {variant === 'LOGIN' ? 'Sign in ' : 'Register'}
                    </Button>

                </form>
                {/* form end */}
                {/* other login ways */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="
                        absolute
                        inset-0
                        flex
                        items-center
                        ">
                            <div
                                className="
                            w-full
                            border-t
                            border-gray-300
                            ">
                            </div>
                        </div>
                        <div className="
                                relative
                                flex
                                justify-center
                                text-sm
                                ">
                            <span className="
                                    bg-white
                                    px-2
                                    text-gray-500
                                    ">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')}></AuthSocialButton>
                        <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')}></AuthSocialButton>
                    </div>
                    <div className="
                    flex
                    gap-2
                    justify-center
                    text-sm
                    mt-6
                    px-2
                    text-gray-500
                    ">
                        <div>
                            {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have account?'}
                        </div>
                        <div onClick={toggleVariant} className="underline cursor-pointer">
                            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AuthForm;

