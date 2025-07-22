import { Button } from "../buttons";
import { HandleActions } from "../../shared";

interface Props<T extends object>{
    isOpen: boolean;
    headerMessage: string;
    children: React.ReactNode;
    data: T;
    weight?: number;
    withoutButtoms?: boolean;
    handleActions: HandleActions<T>;
}

export function Modal<T extends object>({isOpen, data, headerMessage, children, weight,withoutButtoms, handleActions}:Props<T>) {

  return (
    <>
      <div
        className={`${
          isOpen ? "fixed inset-0 z-50 overflow-y-auto" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-black/50 transition-opacity duration-300"
          onClick={() => {
            handleActions.onCancel();
          }}
        />
        <div className="flex min-h-screen items-center justify-center p-4 text-center">
          <div className={`transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all w-full ${weight? weight == 1 && "max-w-sm" || weight == 2 && "max-w-md" || weight == 3 && "max-w-lg" || weight == 4 && "max-w-xl" || weight == 5 && "max-w-4xl" || weight == 6 && "max-w-6xl" || weight == 7 && "max-w-7xl" : "max-w-xl"}`}>
            <div className="flex relative pt-6 justify-center">
              <h3 className="text-xl font-semibold text-gray-900">
                {headerMessage}
              </h3>
            </div>
            
            <div className="flex px-2 sm:px-6 py-2">
                {children}
            </div>

            { withoutButtoms == undefined ?
              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-2xl">
              <Button
                variant="secondary"
                onClick={() => {
                  handleActions.onCancel();
                }}
              >
                Cancelar
              </Button>
              <Button
               onClick={ ()=> { handleActions.onEdit(data) } }
              > Aceptar </Button>
            </div>
             :
              <> </> 
              }
          </div>
        </div>
      </div>
    </>
  );
}
