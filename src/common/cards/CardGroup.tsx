import { HandleActionsGroup } from "../../shared";
import { Button } from "../buttons";
import { FaEdit, FaEye, FaTrash, FaUsers } from "react-icons/fa";

interface Props<T extends object> {
  groupName: string;
  bodyMessage?: string;
  data: T;
  handleActions: HandleActionsGroup<T>;
}

export function CardGroup<T extends object>({
  groupName,
  bodyMessage,
  data,
  handleActions,
}: Props<T>) {
  return (
    <>
      <div className="grid grid-cols-1 gap-y-6 gap-x-2 items-start py-4 px-2">
        <div className="flex flex-col min-h-32 break-after-auto items-start shadow-md rounded-lg bg-slate-50 w-full">
          <div className="flex flex-col w-full">
            <div className="flex w-full px-2 min-h-32 border-4 border-teal-500 rounded-lg items-center justify-center bg-teal-500  lg:border-none">
              <p className="flex text-2xl items-center gap-x-2 font-bold text-white">
                <FaUsers className="w-8 h-8" />
                {groupName}
              </p>
            </div>
            <div className="flex text-slate-600">
              <p className="p-2">{bodyMessage ? bodyMessage : ""}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row w-full justify-center m-auto items-center gap-2 p-2 place-content-center">
            <Button
              variant="ok"
              className="flex items-center justify-center gap-x-1 w-full sm:w-auto"
              onClick={() => {
                handleActions.onView(data);
              }}
            >
              <FaEye className="text-sm" /> Ver
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
    </>
  );
}
