
interface Props {
    messageSended: string;
    hourSended: string;
}

export function MessageSended({ messageSended, hourSended }: Props){
    return(
        <>
        <div className="flex items-start justify-end">
           <div className="max-w-xs md:max-w-md lg:max-w-lg">
             <div className="bg-indigo-600 text-white p-3 rounded-lg rounded-tr-none shadow-sm break-words">
               <p className="break-words">{ messageSended }</p>
             </div>
             <span className="text-xs text-gray-500 mt-1 block text-right">{ hourSended }</span>
           </div>
         </div>
        </>
    )
}