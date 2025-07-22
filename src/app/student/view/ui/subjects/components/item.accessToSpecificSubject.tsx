import { useSelector } from "react-redux";
import { ErrorAuthMessage, Input } from "../../../../../../common";
import { RootState } from "../../../../../../store/store";

interface Props{
    keyForSubject: string;
    setKeyForSubject: (e: string) => void;
}

export function ItemAccessToSpecificSubject({keyForSubject, setKeyForSubject}: Props){

 const errorMessage = useSelector<RootState, string | null>(
    (store) => store.student.errorMessageStudentSubjects
  );

    return(
        <>
         <div className="flex flex-col w-full bg-gray-300/50 rounded-sm pb-8">
                 <div className="flex w-full break-words sm:w-[70%] m-auto h-12 items-center place-content-center">
                    {errorMessage && <ErrorAuthMessage>{errorMessage}</ErrorAuthMessage>}
                 </div>
                 <div className="flex flex-col w-4/5 m-auto gap-y-4 pb-4 rounded-md">
                       <Input 
                                   type="text" 
                                   placeholder={"Ingresar código de acceso"}
                                   value={keyForSubject}
                                   onChange={ (e)=> { setKeyForSubject(e.target.value) } }
                                   required
                                   />
                                   
                    </div>
                 </div>
        </>
    )
}