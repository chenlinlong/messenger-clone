`use client`
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
}) => {
    return (
        <div>
            <div>
                <label htmlFor={id} className="block text-lg font-medium leading-6 ">{label}</label>
            </div>
            <div className="mt-2">
                <input type={type} autoComplete={id} disabled={disabled} {...register(id, { required })}
                    className={clsx(
                        `form-text 
                        block 
                        w-full 
                        rounded-md 
                        border-0 
                        py-1.5
                        p-3
                        text-gray-900 
                        placeholder:text-gray-400 
                        shadow-sm 
                        ring-1  
                        ring-inset 
                        ring-gray-300
                        focus:ring-2 
                        focus:ring-inset 
                        focus:ring-sky-300
                        sm:text-sm 
                        sm:leading-6 
                        `,
                        errors[id] && `focus-ring-rose-500`,
                        disabled && `opacity-50 cursor-default`
                    )} />
            </div>
        </div>

    )
}

export default Input;