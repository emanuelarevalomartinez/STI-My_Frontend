
import { Button } from "../buttons";
import { HandleActionsSection } from "../../shared";
import { FaEdit, FaTrash } from "react-icons/fa";
import { RiStickyNoteAddLine } from "react-icons/ri";

interface Props<T extends object> {
  name: string;
  description?: string;
  numberSession: string;
  data: T;
  handleActions: HandleActionsSection<T>;
}

export function CardSection<T extends object>({
  name,
  description,
  numberSession,
  data,
  handleActions,
}: Props<T>) {
  return (
    <div className="my-2 rounded-xl duration-300 border-2 border-blue-200 border-l-cyan-200">
      <div className="px-3 py-2 rounded-t-xl flex items-center justify-between border-b border-blue-100 bg-gradient-to-r from-teal-400 to-cyan-500">
        <div className="flex items-center gap-2 text-black">
          <p className="text-base font-semibold ">
            <span className="font-normal">#: {numberSession}</span>
          </p>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-lg font-bold text-gray-800 mb-1">Nombre: {name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {description ? (
            <span> Descripción: {description}</span>
          ) : (
            <span className="italic text-gray-500">
              Esta sección no posee una descripción.
            </span>
          )}
        </p>
        <div className="mt-8 sm:mt-3 flex m-auto flex-col md:flex-row gap-2 justify-center sm:justify-end">
        <Button
        variant="ok"
            className="flex items-center justify-center gap-x-1 w-full sm:w-auto"
            onClick={() => {
              handleActions.onAsignResource(data);
            }}
          >
            <RiStickyNoteAddLine className="text-sm" /> Asignar Recursos
          </Button>
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
    </div>
  );
}
