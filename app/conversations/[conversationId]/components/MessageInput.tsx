'use client';

import { FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    placeholder: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldValues
}

const MessageInput: React.FC<MessageInputProps> = ({
    placeholder,
    id,
    type,
    required,
    register
}) => {
    return (
        <div className="relative w-full">
            <input type={type} id={id} autoComplete={id} {...register(id, {required})}
            placeholder={placeholder} className="
            text-black
            font-light
            py-2
            px-4
            bg-neutral-100
            w-full
            rounded-full
            focus:outline-none
            " />
        </div>
    )
}

export default MessageInput;