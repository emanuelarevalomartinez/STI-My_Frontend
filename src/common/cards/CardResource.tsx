import { FcClapperboard } from "react-icons/fc";
import { Button } from "../buttons";
import { HandleActionsResource } from "../../shared";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Props<T extends object> {
  type: string;
  description?: string;
  data: T;
  handleActions: HandleActionsResource<T>;
}

export function CardResource<T extends object>({
  type,
  description,
  data,
  handleActions,
}: Props<T>) {
  return (
    <>
      <div className=" rounded-2xl p-6 shadow-md border-l-6 border-t-1 border-b-1 border-r-1 bg-white my-4 border-blue-500">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-blue-900 font-bold text-2xl">
              <span> Aprendizaje: </span>

              <span className="text-blue-600"> {type} </span>
            </p>
            <h3 className="font-medium mt-1 text-blue-900">
              <span>Descripción: </span>
              <span className="text-blue-600">
                {" "}
                {description ? description : "No hay Descripción"}{" "}
              </span>
            </h3>
          </div>
          <div className="bg-blue-300 p-2 rounded-lg">
            <FcClapperboard />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row mt-1 gap-2 justify-end">
          <Button
            className="flex items-center justify-center gap-x-1 w-full sm:w-auto"
            onClick={() => {
              handleActions.onEdit(data);
            }}
          >
            <FaEdit className="text-sm" /> Editar
          </Button>
          <Button
            variant="danger"
            className="flex items-center justify-center gap-x-1 w-full sm:w-auto"
            onClick={() => {
              handleActions.onDelete(data);
            }}
          >
            <FaTrash className="text-sm" /> Eliminar
          </Button>
        </div>
      </div>
    </>
  );
}
