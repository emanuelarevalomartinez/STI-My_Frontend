import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store/store";
import { setInitialStudentFormPage } from "../../../model";
import { Button } from "../../../../../common/buttons/Button";

export function ItemStudentInitialForm1() {
  const dispatchStudent = useDispatch<AppDispatch>();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full min-h-full justify-between">
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="flex flex-col space-y-8 overflow-y-auto"
      >
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-2xl font-bold text-gray-800">
            El siguiente cuestionario ha sido diseñado para identificar tu estilo preferido para aprender. No es un test de inteligencia, ni de personalidad.
          </p>
          <p className="text-2xl text-gray-700 mt-4">
            • No hay límite de tiempo para contestar.
          </p>
          <p className="text-2xl text-gray-700">
            • No hay respuestas correctas o erróneas. Será útil en la medida que seas sincero/a.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-2xl font-semibold text-gray-800">
            Contesta:
          </p>
          <p className="text-2xl text-gray-700 mt-4">
            • <span className="text-blue-500 font-bold">(SI)</span> en caso de estar más de acuerdo con la sentencia.
          </p>
          <p className="text-2xl text-gray-700">
            • <span className="text-yellow-500 font-bold">(NO)</span> si estás más en desacuerdo con la sentencia.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-2xl text-red-500 font-semibold">
            * Es obligatorio responder cada sentencia para poder avanzar.
          </p>
        </div>
      </div>
      <div className="flex w-full place-content-end px-4 gap-x-4 mt-4">
        <Button
          onClick={() => dispatchStudent(setInitialStudentFormPage(1))}
          disabled={!isAtBottom}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}