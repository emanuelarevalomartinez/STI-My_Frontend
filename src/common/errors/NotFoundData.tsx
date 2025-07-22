import { NOT_FOUND_DATA_IMAGE } from "../../shared";


export function NotFoundData(){
    return(
        <>
      <div className="flex w-full flex-col p-6 h-[50vh] items-center bg-white text-center">
        <img
          src={NOT_FOUND_DATA_IMAGE}
          alt="Data Not Found"
          className="w-20 h-20 m-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800">No se encontraron resultados</h1>
      </div>

        </>
    )
}