import { Outlet, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { Menu, ModalOnlyContainer } from "../../../../../common";
import { setIsStudentFirstTimeOnTheSistem, studentElements } from "../../../model";
import { ItemStudentInitialForm1, ItemStudentInitialForm2 } from "../../components/initialForm";
import { APP_ROUTES } from "../../../../../routes";
import { useEffect } from "react";
import { getStudentFirstTimeOnSystemLocalStorage } from "../../../../../store/browser";

export function StudentContent() {

  const viewMenuBar = useSelector<RootState, boolean>(
    (store) => store.general.viewMenuBar
  );
  const currentFormPage = useSelector<RootState, number>( (state)=> state.student.initialStudentFormCurrentPage );
  const isStudentFirstTime = useSelector<RootState, boolean>( (state)=> state.student.isStudentFirstTimeOnTheSistem );

  const url = useLocation();
  const currentPath = url.pathname;
  const isSudentRoute = currentPath.includes(APP_ROUTES.STUDENT_VIEW)

  const dispatchStudent = useDispatch();
  
  useEffect(() => {
    const isFirstTime = getStudentFirstTimeOnSystemLocalStorage();
    dispatchStudent(setIsStudentFirstTimeOnTheSistem(isFirstTime));
  }, [dispatchStudent]);

  return (
    <>
      <div className="flex flex-row h-[92vh]">
        <Menu elements={studentElements} />
        <div
          className={`flex-1 overflow-y-auto p-4
          ${ viewMenuBar && window.innerWidth >= 640 ? "ml-80": "ml-0" }
          `}
        >

          { isSudentRoute && isStudentFirstTime && (
              <ModalOnlyContainer>
                { currentFormPage == 0 && ( <ItemStudentInitialForm1/> ) }
                { currentFormPage == 1 && ( <ItemStudentInitialForm2/> ) }
              </ModalOnlyContainer>
            )
          }

            <Outlet />

        </div>
      </div>
    </>
  );
}
