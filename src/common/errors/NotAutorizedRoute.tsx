import { useNavigate } from "react-router";
import { Button } from "../buttons";
import { NOT_AUTORIZED_IMAGE } from "../../shared";


export function NotAutorizedRoute() {

    const navigate = useNavigate();

  return(
    <>
       <div className="bg-gray-50 text-gray-800 transition-colors duration-200 min-h-screen flex flex-col">
              <div className="container mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center">
                <div className="max-w-md w-full text-center">
                  <div className="flex justify-center mb-8">
                    <img
                      className="w-[50%]"
                      src={NOT_AUTORIZED_IMAGE}
                      alt="Huevo llorando"
                    />
                  </div>
      
                  <h1 className="text-5xl font-bold mb-4 text-[#6366f1]">401</h1>
                  <h2 className="text-2xl font-semibold mb-4">
                    Pagina con acceso restringido
                  </h2>
                  <p className="mb-2 text-gray-600">
                    Upps! Al parecer tu rol actual no está autorizado para ver este contenido.
                  </p>
      
                  <div className="flex m-auto justify-center w-1/3">
                    <Button
                      className="w-full"
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      Regresar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}