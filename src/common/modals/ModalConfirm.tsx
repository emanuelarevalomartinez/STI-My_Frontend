import { HandleActionsConfirm } from "../../shared";
import { Button } from "../buttons";


interface Props<T extends object>{
    isOpen: boolean;
    headerMessage: string;
    bodyMessage: string;
    data: T;
    handleActions: HandleActionsConfirm<T>;
}

export function ModalConfirm<T extends object>({isOpen,data, headerMessage, bodyMessage, handleActions}:Props<T>) {
  return (
    <>
      <div className={`${isOpen ? "fixed inset-0 z-50 overflow-y-auto": "hidden"}`}>
      <div className="fixed inset-0 bg-black/50 transition-opacity duration-300"
      onClick={ ()=> { handleActions.onCancel();
       } }
      />

      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all w-full max-w-md">

          <div className="flex relative pt-6 justify-center">
            <h3 className="text-xl font-semibold text-gray-900">
              {headerMessage}
            </h3>
          </div>

          <div className="flex justify-center px-6 py-2">
            <p className="text-gray-500">
              {bodyMessage}
            </p>
          </div>

          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-2xl">
            <Button 
              variant="secondary"
              onClick={ ()=> { handleActions.onCancel() } }
            > Cancelar 
            </Button>
            <Button 
              variant="primary"
              onClick={ ()=> { handleActions.onConfirm(data) } }
            > Confirmar 
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
