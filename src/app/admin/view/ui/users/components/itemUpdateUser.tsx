import { useSelector } from "react-redux";
import { ErrorAuthMessage, Input, Select } from "../../../../../../common";
import { RootState } from "../../../../../../store/store";
import { FACULTAD_OPTIONS_NUMBERS, DEFAULT } from "../../../../../auth/register/view/components/register.form.const";

interface Props {
  userFullName: string;
  setUserFullName: (e: string) => void;
  userEmail: string;
  setUserEmail: (e: string) => void;
  userFacultad: string;
  setUserFacultad: (e: string) => void;
}

export function ItemUpdateUser({userFullName, setUserFullName, userEmail, setUserEmail, userFacultad, setUserFacultad}:Props) {

  const errorMessage = useSelector<RootState, string | null>( (store)=> store.admin.setErrorMessageAdminUpdateUser );

  return (
    <>
      <div className="flex flex-col w-full bg-gray-300/50 rounded-sm pb-8">
        <div className="flex w-full break-words sm:w-[70%] m-auto h-12 items-center place-content-center">
             {errorMessage && <ErrorAuthMessage>{errorMessage}</ErrorAuthMessage>}
        </div>
        <div className="flex flex-col w-4/5 m-auto gap-y-2 md:gap-y-8 pb-4 rounded-md">
         <div className="flex flex-col md:flex-row gap-2">
          <Input
            type="text"
            value={userFullName}
            placeholder={"Nombre Completo"}
              onChange={ (e)=> { setUserFullName(e.target.value) } }
            required
          />
          
         </div>
          <div className="flex flex-col md:flex-row gap-2">
          <Input
            type="email"
            placeholder={"Correo"}
            value={userEmail}
             onChange={ (e)=> { setUserEmail(e.target.value) } }
            required
          />
           <Select
                    onChange={(e)=> { setUserFacultad(e.target.value) }}
                    value={userFacultad}
                    required
                  >
                    <option value={DEFAULT}>Facultad</option>
                    {FACULTAD_OPTIONS_NUMBERS.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </Select>
          </div>
        </div>
      </div>
    </>
  );
}
