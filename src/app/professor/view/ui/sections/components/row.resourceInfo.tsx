import { useEffect, useState } from "react";
import { CheckBoxStandar } from "../../../../../../common";
import { ResourcesToAsignateASectionInterface } from "../../../../../../shared";

interface Props {
  resourcesToAsignateASection: ResourcesToAsignateASectionInterface;
  addOrQuitResourceOnListToAsignASection: (e: number, f: boolean) => void;
  updateViewAsociateResourcesToASecction: boolean;
}

export function RowResourceInfo({
  resourcesToAsignateASection,
  addOrQuitResourceOnListToAsignASection,
  updateViewAsociateResourcesToASecction,
}: Props) {
  const [cheked, setCheked] = useState(false);

  const handleChangeCheked = () => {
    const newCheckedState = !cheked;
    addOrQuitResourceOnListToAsignASection(
      resourcesToAsignateASection.id,
      newCheckedState
    );
    setCheked(!cheked);
  };

  useEffect(() => {
    setCheked(false);
      }, [updateViewAsociateResourcesToASecction])

  return (
    <>
      <div
        className={`flex w-full flex-col sm:flex-row items-center gap-1 sm:gap-4 p-3 border-b hover:bg-gray-200 border-gray-200 transition-colors my-1 ${
          cheked ? "bg-gray-100" : ""
        }`}
      >
        <div className="flex items-center text-center w-auto sm:w-36">
          <CheckBoxStandar
            isChecked={cheked}
            setIsChecked={handleChangeCheked}
          />
          <span className="font-medium w-full text-gray-700">
            {resourcesToAsignateASection.type}
          </span>
        </div>
        <div className="flex-1 text-center sm:text-start">
          <span className="font-medium text-gray-700">
            {resourcesToAsignateASection.description
              ? resourcesToAsignateASection.description
              : "No hay descripción disponible"}
          </span>
        </div>
      </div>
    </>
  );
}
