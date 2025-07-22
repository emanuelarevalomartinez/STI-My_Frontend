
import { ErrorAuthMessage, Input } from "../../../../../../common";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";

interface Props {
    name: string;
    setName: (e: string) => void;
    groupPassword: string;
    setGroupPassword: (e: string) => void;
}

export function ItemCreateOrUpdateGroup({name, setName, groupPassword, setGroupPassword}: Props) {

      const errorMessage = useSelector<RootState, string | null>( (store)=> store.professor.errorMessageProfessorGroup );
   
    
  return (
    <>
      <div className="flex flex-col w-full bg-gray-300/50 rounded-sm pb-8">
        <div className="flex w-full break-words sm:w-[90%] m-auto h-12 items-center place-content-center">
        {errorMessage && <ErrorAuthMessage>{errorMessage}</ErrorAuthMessage>}
        </div>
        <div className="flex flex-col w-4/5 m-auto gap-y-4 pb-4 rounded-md">

          <Input
            type="text"
            value={name}
            placeholder={"Nombre del grupo"}
               onChange={ (e)=> { setName(e.target.value) } }
            required
          />
          <Input
            type="text"
            value={groupPassword}
            placeholder={"Contraseña del grupo"}
              onChange={ (e)=> { setGroupPassword(e.target.value) } }
            required
          />
        </div>
      </div>
    </>
  );
}
