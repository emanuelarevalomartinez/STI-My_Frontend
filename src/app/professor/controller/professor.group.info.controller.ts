import { useDispatch, useSelector } from "react-redux";
import { deleteAllBrowserData, GroupSpecificInfoInterface, GroupSpecificInfoToShowInterface, NOTIFICATION, NotificationInfoInteface, ResponseInterface } from "../../../shared";
import { ProfessorGroupInfoModel, setStudentsOnGroup } from "../model";
import { AppDispatch, RootState } from "../../../store/store";
import { useState } from "react";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../routes";



interface UseProfessorGroupInfoController {
  studentsOnGroup: GroupSpecificInfoToShowInterface[];
  fetchGroupInfo: (e: number) => Promise<void>;
  notification: NotificationInfoInteface;
  isVisibleNotifcation: boolean;
  setIsVisibleNotifcation: (e: boolean) => void;
  isLoading: boolean;
}

export const useProfessorGroupInfoController = (): UseProfessorGroupInfoController => {

    const dispatchProfessor = useDispatch<AppDispatch>();
    const studentsOnGroup = useSelector<RootState, GroupSpecificInfoToShowInterface[]>(
          (store) => store.professor.studentsOnGroup
        );

     const navigate = useNavigate();


     const [isLoading, setIsLoading] = useState(false);
     const [isVisibleNotifcation, setIsVisibleNotifcation] = useState(false);
    
        const [notification, setNotification] = useState<NotificationInfoInteface>({
          message: "",
          typeNotification: "error",
        });

         const handleNotification = (
              operation: NOTIFICATION,
              status: ResponseInterface
            ) => {
              setIsVisibleNotifcation(true);
        
              if (status.success) {
                if (operation == NOTIFICATION.CREATE) {
                  setNotification((prev) => ({
                    ...prev,
                    message: "Sección creada con exito",
                    typeNotification: "success",
                  }));
                } else if (operation == NOTIFICATION.EDIT) {
                  setNotification((prev) => ({
                    ...prev,
                    message: "Sección actualizada con exito",
                    typeNotification: "info",
                  }));
                } else if (operation == NOTIFICATION.DELETE) {
                  setNotification((prev) => ({
                    ...prev,
                    message: "Sección eliminada con exito",
                    typeNotification: "success",
                  }));
                }
              } else {
                setNotification((prev) => ({
                  ...prev,
                  message: status.error || "Unknown error",
                  typeNotification: "error",
                }));
        
                if (status.error == "Unauthorized") {
                  setTimeout(() => {
                    deleteAllBrowserData();
                    navigate(APP_ROUTES.LOGIN);
                  }, 2000);
                }
              }
            };
        
            const loadingEfect = () => {
              setIsLoading(true);
              setTimeout(async () => {
                setIsLoading(false);
              }, 1000);
            };

       const fetchGroupInfo = async (idGroup: number) => {
          const sectionData = await ProfessorGroupInfoModel.getAllGroupInfo(idGroup);

          let data: GroupSpecificInfoInterface[] = sectionData.data;
          if(data){
            let dataToView: GroupSpecificInfoToShowInterface[] = data.map( (item) => { 
              const newData: GroupSpecificInfoToShowInterface = {
                 email: item.email,
                 facultad: item.facultad,
                 fullname: item.fullname,
                 username: item.username,
              }
              return newData;
             } )
            dispatchProfessor(setStudentsOnGroup(dataToView));
          } else {
            dispatchProfessor(setStudentsOnGroup([]));
            handleNotification( NOTIFICATION.DELETE , sectionData);
            setTimeout(() => {
              deleteAllBrowserData();
              navigate(APP_ROUTES.LOGIN);
            }, 2000);
          }
        };

  return {
    studentsOnGroup,
    fetchGroupInfo,
    notification,
    isVisibleNotifcation,
    setIsVisibleNotifcation,
    isLoading,
  };
};
