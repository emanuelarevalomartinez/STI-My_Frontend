interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
   
}


export function Input({...props}: Props){
    return(
        <>
         <input
                {...props}
                className="py-3 px-5 rounded-md w-full bg-zinc-50 outline-gray-900"
              />
        </>
    )
}