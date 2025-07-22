import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { ErrorAuthMessage } from "../../../../../common";



export function RegisterError(){
  
  const errorMessage = useSelector<RootState, string | null>( (store)=> store.register.errorMessageRegister );

    return(
        <>
          <div className="flex h-12 items-center w-full break-words sm:w-4/6 m-auto">
            {errorMessage && <ErrorAuthMessage>{errorMessage}</ErrorAuthMessage>}
          </div>
        </>
       )
   }
