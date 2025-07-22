import { useSelector } from "react-redux";
import { NOT_FOUND_DATA_IMAGE, PaginationInterface, ResourcesToAsignateASectionInterface } from "../../../../../../shared";
import { RowResourceInfo } from "./row.resourceInfo";
import { RootState } from "../../../../../../store/store";
import { ErrorAuthMessage, Pagination } from "../../../../../../common";
import { useEffect } from "react";

interface Props {
  existSomeResource: boolean;
  updateViewAsociateResourcesToASecction: boolean;
  resourcesToAsignateASection: ResourcesToAsignateASectionInterface[];
  addOrQuitResourceOnListToAsignASection: (e: number, f: boolean) => void;
  paginationResourcesAsignatesToASection: PaginationInterface;
  previewPage: () => Promise<void>;
  nextPage: () => Promise<void>;
}

export function ItemAddResourcesToSection({
  existSomeResource,
  updateViewAsociateResourcesToASecction,
  resourcesToAsignateASection,
  addOrQuitResourceOnListToAsignASection,
  paginationResourcesAsignatesToASection,
  previewPage,
  nextPage,
}: Props) {

  const errorMessage = useSelector<RootState, string | null>(
      (store) => store.professor.errorMessageProfessorSection
    );

    useEffect(() => {
    }, [updateViewAsociateResourcesToASecction])
    

  return (
    <>
      {existSomeResource === false ? (
        <div className="flex flex-col w-full h-96 items-center justify-center font-semibold text-2xl text-green-500 p-4 text-center">
           <img
                          src={NOT_FOUND_DATA_IMAGE}
                          alt="Data Not Found"
                          className="w-20 h-20"
                        />
          <p> Aún no existe ningún recurso para ser asignado </p>
        </div>
      ) : (
        
          resourcesToAsignateASection.length === 0 ? (
            <div className="flex flex-col w-full">
               <div className={`h-2 flex w-full break-words sm:w-[90%] m-auto items-center place-content-center`}>
                      {errorMessage && <ErrorAuthMessage>{errorMessage}</ErrorAuthMessage>}
                    </div>
            <div
              className={`flex w-full flex-col sm:flex-row items-center gap-1 sm:gap-4 p-3 border-b border-gray-200 bg-gray-500 transition-colors my-1 rounded-tl-3xl rounded-tr-3xl text-white`}
            >
              <div className="flex items-center gap-x-2">
                <span>Si/No</span>
                <span className="font-medium ">Aprendizaje</span>
              </div>
              <div className="flex-1">
                <span className="font-medium pl-0 sm:pl-2">Descripción</span>
              </div>
            </div>
              <div className="flex flex-col w-full h-96 items-center justify-center font-semibold text-2xl text-green-500 p-4 text-center">
                 <img
                          src={NOT_FOUND_DATA_IMAGE}
                          alt="Data Not Found"
                          className="w-20 h-20"
                        />
          <p> No hay recursos sin asignar en esta página </p>
          
        </div>
               <div>
             <Pagination
                            page={paginationResourcesAsignatesToASection.page}
                            limit={paginationResourcesAsignatesToASection.limit}
                            total={paginationResourcesAsignatesToASection.total}
                            totalPages={paginationResourcesAsignatesToASection.totalPages}
                            previewPage={previewPage}
                            nextPage={nextPage}
                          />
            </div>
            </div>

          ) : (
            <div className="flex flex-col w-full">
            <div className={`h-2 flex w-full break-words sm:w-[90%] m-auto items-center place-content-center`}>
                      {errorMessage && <ErrorAuthMessage>{errorMessage}</ErrorAuthMessage>}
                    </div>
            <div
              className={`flex w-full flex-col sm:flex-row items-center gap-1 sm:gap-4 p-3 border-b border-gray-200 bg-gray-500 transition-colors my-1 rounded-tl-3xl rounded-tr-3xl text-white`}
            >
              <div className="flex items-center gap-x-2">
                <span>Si/No</span>
                <span className="font-medium ">Aprendizaje</span>
              </div>
              <div className="flex-1">
                <span className="font-medium pl-0 sm:pl-2">Descripción</span>
              </div>
            </div>
            <div className="overflow-y-auto h-96">
              {resourcesToAsignateASection.map((resource, index) => {
                return (
                  <RowResourceInfo
                    resourcesToAsignateASection={resource}
                    addOrQuitResourceOnListToAsignASection={addOrQuitResourceOnListToAsignASection}
                    key={index}
                    updateViewAsociateResourcesToASecction={updateViewAsociateResourcesToASecction}
                  />
                );
              })}
             
            </div>
            <div>
             <Pagination
                            page={paginationResourcesAsignatesToASection.page}
                            limit={paginationResourcesAsignatesToASection.limit}
                            total={paginationResourcesAsignatesToASection.total}
                            totalPages={paginationResourcesAsignatesToASection.totalPages}
                            previewPage={previewPage}
                            nextPage={nextPage}
                          />
            </div>
          </div>
          )
        
       
        
      )}
    </>
  );
}
