import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'ok' | 'other';
    className?: string;
}


export function Button({children, variant = 'default', className, ...props}:Props){

    const variantStyles = {
        default: 'bg-blue-500 hover:bg-blue-800 text-white disabled:bg-blue-300',
        primary: 'bg-[#E7A312] hover:bg-black text-white disabled:bg-yellow-200',
        secondary: 'bg-gray-500 hover:bg-gray-800 text-white disabled:bg-gray-300',
        danger: 'bg-red-500 hover:bg-red-800 text-white disabled:bg-red-300',
        ok: 'bg-green-500 hover:bg-green-800 text-white disabled:bg-green-300',
        other: 'bg-gray-800 hover:bg-gray-900 text-white disabled:bg-gray-300',
      } as const;

    const baseStyles =`py-3 px-2 rounded-md font-bold font-bold ${variantStyles[variant]} ${className}`;


    return(
        <>
         <button
         className={baseStyles}
         {...props}
          >
          {children}
         </button>
        </>
    )
}