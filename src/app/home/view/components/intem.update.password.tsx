import { useSelector } from "react-redux";
import { ErrorAuthMessage, Input } from "../../../../common"
import { RootState } from "../../../../store/store";

interface Props {
  currentPassword: string;
  setCurrentPassword: (e: string) => void;
  newPassword: string;
  setNewPassword: (e: string) => void;
  confirmNewPassword: string;
  setConfirmNewPassword: (e: string) => void;
}

export function ItemUpdatePassword({currentPassword, setCurrentPassword, newPassword, setNewPassword, confirmNewPassword, setConfirmNewPassword}: Props){

 const errorMessage = useSelector<RootState, string | null>( (store)=> store.general.errorMessageUserUpdatePassword );

    return(
        <>
        <div className="flex flex-col w-full bg-gray-300/50 rounded-sm pb-8">
        <div className="flex w-full break-words sm:w-[70%] m-auto h-12 items-center place-content-center">
           {errorMessage && <ErrorAuthMessage>{errorMessage}</ErrorAuthMessage>}
        </div>
        <div className="flex flex-col w-4/5 m-auto gap-y-4 pb-4 rounded-md">
              <Input 
                          type="password" 
                          placeholder={"Contraseña actual"}
                          value={currentPassword}
                          onChange={ (e)=> { setCurrentPassword(e.target.value) } }
                          required
                          />
                          <Input 
                          type="password" 
                          placeholder={"Nueva contraseña"}
                          value={newPassword}
                          onChange={ (e)=> { setNewPassword(e.target.value) } }
                          required
                          />
                           <Input 
                          type="password" 
                          placeholder={"Confirmar nueva contaseña"}
                          value={confirmNewPassword}
                          onChange={ (e)=> { setConfirmNewPassword(e.target.value) } }
                          required
                          />
                          
           </div>
        </div>
          
        </>
    )
}