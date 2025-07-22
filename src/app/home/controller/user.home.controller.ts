import { useNavigate } from "react-router";
import { getUserLocalStore } from "../../../store/browser";
import { APP_ROUTES } from "../../../routes";
import { useState } from "react";
import { deleteAllBrowserData, HandleActions, HandleActionsConfirm, normalRegexPassword, NOTIFICATION, NotificationInfoInteface, ResponseInterface, UserRequestUpdatePassword, UsersDataCount } from "../../../shared";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { setErrorMessageUserUpdatePassword } from "../../../store/slices";
import { UserHomeModel } from "../model";


interface UseUserHomeControllerController {
  isOpenExitModal: boolean;
  setisOpenExitModal: (e: boolean) => void;
  isOpenUpdatePasswordModal: boolean;
  setIsOpenUpdatePasswordModal: (e: boolean) => void;
  currentPassword: string;
  setCurrentPassword: (e: string) => void;
  newPassword: string;
  setNewPassword: (e: string) => void;
  confirmNewPassword: string;
  setConfirmNewPassword: (e: string) => void;
  handleActionsUpdatePasswordModal: HandleActions<any>;
  handleActionsExitModal: HandleActionsConfirm<any>;
  getAllSystemDataCount: ()=> Promise<void>;
  usersDataCount: UsersDataCount;
  cantSubjectsDataCount: number;
  exit: ()=> void;
  notification: NotificationInfoInteface;
  isVisibleNotifcation: boolean;
  setIsVisibleNotifcation: (e: boolean) => void;
  isLoading: boolean;
}

export const useUserHomeController = (): UseUserHomeControllerController => {

  const dispatchHome = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [updateView, setUpdateView] = useState(false);
    const [isOpenExitModal, setisOpenExitModal] = useState(false);
    const [isOpenUpdatePasswordModal, setIsOpenUpdatePasswordModal] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [ usersDataCount, setUsersDataCount] = useState<UsersDataCount>({
      admin: 0,
      professor: 0,
      student: 0,
      total: 0,
    });

    const [cantSubjectsDataCount, setCantSubjectsDataCount] = useState<number>(0);

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
                    message: "Usuario creado con exito",
                    typeNotification: "success",
                  }));
                } else if (operation == NOTIFICATION.EDIT) {
                  setNotification((prev) => ({
                    ...prev,
                    message: "Contraseña actualizada con exito",
                    typeNotification: "info",
                  }));
                } else if (operation == NOTIFICATION.DELETE) {
                  setNotification((prev) => ({
                    ...prev,
                    message: "Usuario eliminado con exito",
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
    
      const validateFieldsToUpdateNewPassword = (): boolean => {
    
        if (!(normalRegexPassword.test(currentPassword) && currentPassword.length > 0)) {
          dispatchHome(setErrorMessageUserUpdatePassword("Contraseña actual inválida"));
          return false;
        }
        if (!(normalRegexPassword.test(newPassword) && newPassword.length > 0)) {
          dispatchHome(setErrorMessageUserUpdatePassword("Nueva Contraseña no cumple requisitos"));
          return false;
        }
        if (!(confirmNewPassword === newPassword && confirmNewPassword.length > 0)) {
          dispatchHome(setErrorMessageUserUpdatePassword("Contraseña y confirmación distintas"));
          return false;
        }
    
        dispatchHome(setErrorMessageUserUpdatePassword(null));
        return true;
        };

       const handleActionsUpdatePasswordModal: HandleActions<any> = {
          onEdit: () => { 
             updatePassword();
           },
          onDelete: () => ()=> { },
          onCancel: () => { 
            cleanAllDataInstancesAndModals();
           },
        };

        const updatePassword = async () => {
            if(validateFieldsToUpdateNewPassword()){
           
                   let newPasswordInfo: UserRequestUpdatePassword = {
                     currentPassword: currentPassword,
                     password: newPassword,
                   };
           
                   loadingEfect();
           
                   const status = await UserHomeModel.updatePassword(getUserLocalStore(), newPasswordInfo);
           
                   setUpdateView(!updateView);
           
                   handleNotification(NOTIFICATION.EDIT, status);
           
                   cleanAllDataInstancesAndModals();
            }
        }
    
      const handleActionsExitModal: HandleActionsConfirm<any> = {
          onConfirm: () => { 
            exit()
          
           },
          onCancel: () => { 
            cleanAllDataInstancesAndModals();
           },
        };

        const getAllSystemDataCount = async () => {
          const responseUsersData = await UserHomeModel.gettAllUsersToDataInfo();
          const responseSubjectData = await UserHomeModel.getAllCurrentSubjectsToDataInfo();

          if(responseUsersData.error || responseSubjectData.error){
            handleNotification(NOTIFICATION.EDIT, responseUsersData);
          } else {
            setUsersDataCount({
              admin: responseUsersData.data.admin,
              professor: responseUsersData.data.professor,
              student: responseUsersData.data.student,
              total: responseUsersData.data.total,
            })
            setCantSubjectsDataCount(responseSubjectData.data.length);
          }
        }

        const exit = () => {
          deleteAllBrowserData();
          navigate(APP_ROUTES.LOGIN);
       }

         const cleanAllDataInstancesAndModals = () => {
             setCurrentPassword("");
             setNewPassword("");
             setConfirmNewPassword("");
             setisOpenExitModal(false);
             setIsOpenUpdatePasswordModal(false);
             dispatchHome(setErrorMessageUserUpdatePassword(null));
           };

  return {
    isOpenExitModal,
    setisOpenExitModal,
    isOpenUpdatePasswordModal,
    setIsOpenUpdatePasswordModal,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    handleActionsUpdatePasswordModal,
    handleActionsExitModal,
    getAllSystemDataCount,
    usersDataCount,
    cantSubjectsDataCount,
    exit,
    notification,
    isVisibleNotifcation,
    setIsVisibleNotifcation,
    isLoading,
  };
};
