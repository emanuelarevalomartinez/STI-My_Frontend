import { FaUsers } from "react-icons/fa";
import { FIDEL_SIGNATURE } from "../../../../shared";
import { ItemAllUsersCard } from "./item.all.users.card";
import { IoIosJournal } from "react-icons/io";
import { useUserHomeController } from "../../controller";
import { useEffect } from "react";

export function AllUsersView(){

  const { getAllSystemDataCount, usersDataCount, cantSubjectsDataCount } = useUserHomeController();

  useEffect(() => {
    getAllSystemDataCount();
  }, [])
  

    return(
        <>
        <div>
          <ItemAllUsersCard/>
        </div>

       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 my-8">
         <div className="bg-[#00135A] text-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
           <p className="text-5xl font-bold"> {usersDataCount.total} </p>
           <p className="flex items-center gap-x-1 text-xl font-light mt-2 text-center"> <FaUsers /> Total de Usuarios</p>
         </div>
         <div className="bg-[#00135A] text-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
           <p className="text-5xl font-bold"> {usersDataCount.admin} </p>
           <p className="flex items-center gap-x-1 text-xl font-light mt-2 text-center"> <FaUsers /> Administradores</p>
         </div>
         <div className="bg-[#00135A] text-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
           <p className="text-5xl font-bold"> {usersDataCount.professor} </p>
           <p className="flex items-center gap-x-1 text-xl font-light mt-2 text-center"> <FaUsers /> Profesores</p>
         </div>
         <div className="bg-[#00135A] text-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
           <p className="text-5xl font-bold"> {usersDataCount.student} </p>
           <p className="flex items-center gap-x-1 text-xl font-light mt-2 text-center"> <FaUsers /> Estudiantes</p>
         </div>
         <div className="bg-[#00135A] text-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
           <p className="text-5xl font-bold"> {cantSubjectsDataCount} </p>
           <p className="flex items-center gap-x-1 text-xl font-light mt-2 text-center"> <IoIosJournal /> Cursos</p>
         </div>
       </div>

         <div className="bg-yellow-500 text-white rounded-lg gap-y-8 shadow-lg p-4 lg:p-8 mb-8 flex flex-col lg:flex-row items-center justify-between">
          <p className="flex w-2/3 text-2xl md:text-4xl font-bold">"El futuro de nuestra patría tiene que ser necesariamente un futuro de hombres de ciencia"(...)</p>
          <img className="flex w-1/3" src={FIDEL_SIGNATURE} alt="Fidel Castro Signature" />
         </div>
       
        </>
    )
}
