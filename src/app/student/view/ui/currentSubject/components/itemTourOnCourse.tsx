import {
  CHAT_WELCOME_IMAGE,
  INIT_WALK_1_IMAGE,
  INIT_WALK_2_IMAGE,
  INIT_WALK_3_IMAGE,
} from "../../../../../../shared";
import { setStudentFirstTimeOnSomeCourse } from "../../../../../../store/browser";

interface Props {
  progresBarPosition: number;
  setProgresBarPosition: (e: number) => void;
  setIsOpenTourOnCourse: (e: boolean) => void;
}

export function ItemTourOnCourse({
  progresBarPosition,
  setProgresBarPosition,
  setIsOpenTourOnCourse,
}: Props) {

  return (
    <div className="fixed z-10 bg-gray-100/20 flex flex-col w-screen h-screen text-center justify-center">
      <div
        className={`${
          progresBarPosition == 0 ? "flex flex-col md:flex-row absolute left-0 top-1/6" : "hidden"
        }`}
      >
        <img
          src={CHAT_WELCOME_IMAGE}
          alt="Huevo señalando"
          className="inline-block top-0 h-40 w-40 sm:h-56 sm:w-56"
        />
        <p className="inline-block px-4 py-2 bg-amber-200 backdrop-blur-sm rounded-tl-lg shadow-md text-gray-800 font-medium border border-gray-200 w-50 h-fit">
          Hola, soy Ozi, tu asistente virtual y guía en esta aventura. Haz click
          en "Siguiente" para comenzar el recorrido.
        </p>
      </div>

      <div
        className={`${
          progresBarPosition == 1
            ? "flex flex-col lg:flex-row absolute left-[3%] top-[5%]"
            : "hidden"
        }`}
      >
        <img
          src={INIT_WALK_1_IMAGE}
          alt="Huevo señalando"
          className="inline-block top-0 h-40 w-40 sm:h-56 sm:w-56"
        />
        <p className="inline-block px-4 py-2 bg-amber-200 backdrop-blur-sm rounded-tl-lg shadow-md text-gray-800 font-medium border border-gray-200 h-fit w-50 lg:w-96 xl:w-auto">
          En los cursos cuentas con una barra de Progreso para que sepas cuanto
          has avanzado
        </p>
      </div>

      <div
        className={`${
          progresBarPosition == 2
            ? "flex items-center flex-col absolute left-[10%] sm:left-[20%] top-[24%]"
            : "hidden"
        }`}
      >
        <p className=" px-4 py-2 bg-amber-200 backdrop-blur-sm rounded-br-lg shadow-md text-gray-800 font-medium border border-gray-200 h-fit w-50 lg:w-auto">
          Secciones del curso con distintos materiales y ejercicios
        </p>
        <img
          src={INIT_WALK_2_IMAGE}
          alt="Huevo señalando"
          className=" top-0 h-40 w-40 sm:h-56 sm:w-56"
        />
      </div>

      <div
        className={`${
          progresBarPosition == 3
            ? "flex flex-col lg:flex-row fixed right-0 top-[60%]"
            : "hidden"
        }`}
      >
        <p className="inline-block px-4 py-2 bg-amber-200 backdrop-blur-sm rounded-br-lg shadow-md text-gray-800 font-medium border border-gray-200 h-fit mt-6 w-50 md:w-auto">
          Y siempre voy a estar aqui por si me necesitas
        </p>
        <img
          src={INIT_WALK_3_IMAGE}
          alt="Huevo señalando"
          className="inline-block top-0 h-40 w-40 sm:h-56 sm:w-56"
        />
      </div>

      <div 
      onClick={ ()=> { setProgresBarPosition(progresBarPosition - 1); } }
      className="flex gap-x-2 absolute top-[70%] left-[2%]">
        hola
      </div>

      <div
        className="flex gap-x-2 fixed top-[90%] cursor-pointer bg-yellow-500 font-medium text-white p-1 sm:p-2 rounded-xl"
        onClick={() => {
          setProgresBarPosition(progresBarPosition + 1);
          if (progresBarPosition + 1 >= 4) {
            setIsOpenTourOnCourse(false);
            setStudentFirstTimeOnSomeCourse(false);
          }
        }}
      >
        <p>Siguiente</p>
      </div>

      <div className=" fixed top-[96%] w-[90%] bg-gray-200 rounded-full h-4 md:h-6">
        <div className="grid grid-cols-3">
          <p
            className={`transition-colors duration-700 ${
              progresBarPosition >= 1 ? "bg-yellow-400" : "bg-white"
            } rounded-l-full h-4 md:h-6`}
          ></p>
          <p
            className={`transition-colors duration-700 ${
              progresBarPosition >= 2 ? "bg-yellow-400" : "bg-white"
            } h-4 md:h-6`}
          ></p>
          <p
            className={`transition-colors duration-700 ${
              progresBarPosition >= 3 ? "bg-yellow-400" : "bg-white"
            }  rounded-r-full h-4 md:h-6`}
          ></p>
        </div>
      </div>
    </div>
  );
}
