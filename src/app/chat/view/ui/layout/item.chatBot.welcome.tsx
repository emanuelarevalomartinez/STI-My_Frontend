import { CHAT_WELCOME_IMAGE } from "../../../../../shared";


export function ItemChatBotWelcome(){
    return(
        <>
            <div className="flex flex-col items-center h-full w-full">
          <img
            src={CHAT_WELCOME_IMAGE}
            className=" rounded-full h-40 w-40 sm:h-56 sm:w-56"
          />
          <p className="flex text-center text-md sm:text-2xl">Soy OZI, ¿Como te puedo ayudar hoy? </p>
        </div>
        </>
    )
}