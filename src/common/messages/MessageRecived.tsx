import { CHAT_ANSWER_IMAGE } from "../../shared";

interface Props {
    messageRecived: string;
    hourRecived: string;
}   

export function MessageRecived({ messageRecived, hourRecived }: Props ){
    return(
        <>
           <div className="flex items-start">
           <div className="flex items-center justify-center rounded-full bg-indigo-600 text-white text-xs flex-shrink-0">
             <img className="h-10 w-10 rounded-full" src={CHAT_ANSWER_IMAGE} alt="Huevo Responde" />
           </div>
           <div className="ml-3 max-w-xs md:max-w-md lg:max-w-lg">
             <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-gray-100 break-words">
               <p className="text-gray-800 break-words"> { messageRecived } </p>
             </div>
             <span className="text-xs text-gray-500 mt-1 block"> { hourRecived } </span>
           </div>
         </div>
        </>
    )
}