import { FaBook, FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "../buttons";
import { HandleActions } from "../../shared";

type WithImage<T> = T & { image: string | null };

interface Props<T extends object>{
    name: string;
    data: WithImage<T>;
    handleActions: HandleActions<T>;
}


export function CardSubject<T extends object>({name,data, handleActions}:Props<T>){
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
            
            <div className="flex flex-col lg:flex-row space-x-3 mt-4 gap-y-2">
              <Button 
              className="flex items-center gap-1 flex-1 justify-center w-full"
              onClick={ ()=> { handleActions.onEdit(data);
               } }
              >
                <FaEdit className="text-sm" /> Editar
              </Button>
              <Button variant="danger" className="flex items-center gap-1 flex-1 justify-center w-full"
                onClick={ ()=> { handleActions.onDelete(data) } }
              > 
                <FaTrash className="text-sm" /> Eliminar
              </Button>
            </div>
          </div>
        </div>
        </>
    )
}