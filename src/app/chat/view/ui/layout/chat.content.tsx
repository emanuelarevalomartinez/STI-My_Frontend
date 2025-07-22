import { GrClose } from "react-icons/gr";
import { LuSend } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { AppDispatch } from "../../../../../store/store";
import { useDispatch } from "react-redux";
import { setIsChatModalOpen } from "../../../model";
import { useChatController } from "../../../controller";
import { useEffect, useRef } from "react";
import { LoadingPoints, MessageRecived, MessageSended } from "../../../../../common";
import { ItemChatBotWelcome } from "./item.chatBot.welcome";
import { CHAT_THINKING_IMAGE_GIF } from "../../../../../shared";
import { setIModalStudentCurrentSubjectOpen } from "../../../../student";

export function ChatContent() {

    const dispatchChat = useDispatch<AppDispatch>();

    const { updateView, chatMessages, getAllChat, newMessage,setNewMessage, sendNewMessage, waithingMessageResponse, deleteMessages } = useChatController();

    const lastMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getAllChat();
    }, [updateView])

    const scrollToBottom = () => {
        lastMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        getAllChat();
    }, [updateView]);

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages, waithingMessageResponse]); 

    
  return (
    <>

    <div className="flex justify-between pr-4 py-2">
        <div className="flex items-center">
            <p className="text-2xl font-extrabold">Chat</p>
        </div>
      <div className="flex gap-x-4">
      <MdDeleteOutline 
      onClick={ ()=> { deleteMessages() } }  
      className={`${chatMessages.length === 0 ? "text-gray-200" : "text-black hover:bg-red-500 hover:text-white cursor-pointer"} w-10 h-10 rounded-md`}
      />
      <GrClose className="cursor-pointer w-10 h-10 hover:bg-red-500 rounded-full bg-gray-500 p-1 text-black hover:text-white" onClick={ ()=> { dispatchChat(setIsChatModalOpen(false)), dispatchChat(setIModalStudentCurrentSubjectOpen(false)) } }/>
      </div>
    </div>

    <div className="flex h-[80vh] w-full max-w-4xl mx-auto rounded-2xl overflow-hidden">
     <div className="flex flex-col flex-auto h-full">
       <div className="flex flex-col h-full overflow-y-auto p-4 space-y-4 bg-gray-200 rounded-2xl">

         <div>
            { chatMessages.length != 0 ?  (
                chatMessages.map( (message, index)=> {
                    return(
                        
                          <div key={index}> 
                           <MessageSended messageSended={ message.messageStudent } hourSended={ message.createAtMessageStudent } />
                              <MessageRecived messageRecived={ message.messageBot } hourRecived={ message.createAtMessageBot }/>
                             
                           </div>
                        
                    )
                } )
            ) : ( 
                <div> <ItemChatBotWelcome/> </div>
             ) }
            { waithingMessageResponse && (
                <div className="flex pt-4 gap-x-2 items-center">
              <img className="h-10 w-10 rounded-full" src={CHAT_THINKING_IMAGE_GIF} alt="Huevo Pensando" /> 
              <LoadingPoints/>
           </div>
            ) }
         </div>
         <div className="flex" ref={lastMessagesRef}> </div>
       </div>

       <div className="p-4 mt-2 rounded-xl border-gray-200 bg-gray-400">
         <div className="flex items-center space-x-2">
           <div className="flex-grow relative">
             <textarea
               className="w-full h-20 p-3 pr-12 text-md text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 resize-none transition-all"
               placeholder="Escribe tu mensaje..."
               rows={3}
               value={newMessage.message}
               onChange={ (e)=> { setNewMessage({ message: e.target.value }) } }
             />
             <button className="absolute right-3 bottom-3 p-1 text-gray-400 hover:text-indigo-600 transition-colors">
               <LuSend className="w-5 h-5" 
               onClick={ ()=> { sendNewMessage() } }
               />
             </button>
           </div>
         </div>
         <p className="text-xs text-black mt-2 text-center">
           OZI puede cometer errores. Verifica la información importante.
         </p>
       </div>
     </div>
   </div>
    </>
    
  );
}