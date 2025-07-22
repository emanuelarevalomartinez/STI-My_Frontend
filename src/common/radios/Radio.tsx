import { ChangeEvent } from "react";


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    isYes: boolean;
    children:React.ReactNode;
    handleOptionChange: (e: ChangeEvent<HTMLInputElement>)=> void;
    selectedOption: string;
    inputType: string;
}

export function Radio({isYes, handleOptionChange, selectedOption, children, inputType, ...props}:Props){


    return(
        
           <label className={`font-medium h-10 md:h-14 relative w-24 md:w-28 hover:bg-zinc-100 flex items-center px-1 md:px-3 gap-1 md:gap-3 rounded-lg has-[:checked]:ring-1 select-none ${isYes ? "has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300": "has-[:checked]:text-yellow-300 has-[:checked]:bg-yellow-50 has-[:checked]:ring-yellow-300"}`}>
                <div className="w-5"></div>
                {children}
                <input
                  {...props}
                  type="radio"
                  value={inputType}
                  className="w-4 h-4 absolute accent-current right-3"
                  onChange={(e)=> { handleOptionChange(e) }}
                  checked={selectedOption === inputType}
                />
              </label>
        
    )
}