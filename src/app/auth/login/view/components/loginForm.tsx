import { FormEvent, useState } from "react";
import { Input } from "../../../../../common";
import { FIELD_PLACEHOLDER_PASSWORD_TEXT, FIELD_PLACEHOLDER_USER_NAME_TEXT } from "./login.form.dictionary";
import { Button } from "../../../../../common/buttons/Button";
import { LoginRequestInterface } from "../../../../../shared/interfaces";
import { useLoginController } from "../../controller";



export function LoginForm(){

    const { validateLoginFields, sendLoginData } = useLoginController();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: LoginRequestInterface = { username, password }
          if(validateLoginFields(data)){
            sendLoginData(data);
          }
      };

    return(
        <>
           <form 
            onSubmit={handleSubmit}  
            className="flex flex-col gap-y-2 md:w-[500px] w-[300px]"
            >
              <Input 
              type="text" 
              placeholder={FIELD_PLACEHOLDER_USER_NAME_TEXT}
              onChange={ (e)=> { setUserName(e.target.value) } }
              required
              />
              <Input 
              type="password" 
              placeholder={FIELD_PLACEHOLDER_PASSWORD_TEXT}
              onChange={ (e)=> { setPassword(e.target.value) } }
              required
              />
              <Button className="mt-4" variant="primary">
                Acceder
              </Button>
            </form>
        </>
    )
}