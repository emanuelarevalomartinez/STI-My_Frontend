import { FaBook, FaKey } from "react-icons/fa";
import { HandleActionsStudentSubjects } from "../../shared";
import { Button } from "../buttons";


type WithImage<T> = T & { image: string | null };

interface Props<T extends object>{
    name: string;
    data: WithImage<T>;
    handleActions: HandleActionsStudentSubjects<T>;
}

export function CardStudentSubject<T extends object>({name,data, handleActions}:Props<T>){
    return(
        <>
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 bg-gray-500 flex items-center justify-center">
                    {data.image ? (
                            <img 
                                src={data.image} 
                                alt={name} 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-white text-6xl opacity-20">
                                <FaBook />
                            </div>
                        )}
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{name} </h3>
                    
                    <div className="flex flex-row space-x-3 mt-4 gap-y-2">
                      <Button 
                      className="flex items-center gap-1 flex-1 justify-center w-full"
                      onClick={ ()=> { handleActions.onAccess(data);}}
                      >
                        <FaKey /> Acceder
                      </Button>
                    </div>
                  </div>
                </div>
                </>
    )
}