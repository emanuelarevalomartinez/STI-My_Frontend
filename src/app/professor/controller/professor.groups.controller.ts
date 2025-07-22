import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllBrowserData,
  GroupInterface,
  GroupRequestInterface,
  HandleActions,
  HandleActionsGroup,
  NOTIFICATION,
  NotificationInfoInteface,
  PROFESSOR_GROUP_MODAL_TIPE,
  ResponseInterface,
} from "../../../shared";
import { ProfessorGroupModel, setErrorMessageProfessorGroup, setGroups } from "../model";
import { AppDispatch, RootState } from "../../../store/store";
import { useState } from "react";
import { APP_ROUTES, PROFESSOR_ROUTES } from "../../../routes";
import { useNavigate } from "react-router";

interface ProfessorGroupsControllerInterface {
  groups: GroupInterface[];
  group: GroupInterface;
  isModalOpen: boolean;
  isModalDeleteOpen: boolean;
  headerMessage: string;
  createNewGroup: () => void;
  handleActionsModal: HandleActions<GroupInterface>;
  handleActionsGroupDeleteModal: HandleActions<GroupInterface>;
  handleActionsGroupModal: HandleActionsGroup<GroupInterface>;
  fetchGroups: () => Promise<void>;
  DeleteSpecificGroup: (group: GroupInterface) => Promise<void>;
  updateView: boolean;
  name: string;
  setName: (e: string) => void;
  groupPassword: string;
  setGroupPassword: (e: string) => void;
  notification: NotificationInfoInteface,
  isVisibleNotifcation: boolean,
  setIsVisibleNotifcation: (e: boolean) => void,
  isLoading: boolean,
}

export const useProfessorGroupsController =
  (): ProfessorGroupsControllerInterface => {

    const dispatchProfessor = useDispatch<AppDispatch>();
    const groups = useSelector<RootState, GroupInterface[]>(
      (store) => store.professor.groups
    );

      const navigate = useNavigate();

    const [updateView, setUpdateView] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIModalDeleteOpen] = useState(false);
    const [headerMessage, setHeaderMessage] = useState("");

    const [name, setName] = useState("");
    const [groupPassword, setGroupPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    
      const [isVisibleNotifcation, setIsVisibleNotifcation] = useState(false);
    
      const [notification, setNotification] = useState<NotificationInfoInteface>({
        message: "",
        typeNotification: "error",
       });
    
       const handleNotification = (operation: NOTIFICATION, status: ResponseInterface) => {
    
        setIsVisibleNotifcation(true);
        
        if (status.success) {
    
          if( operation == NOTIFICATION.CREATE ){
            setNotification(prev => ({
              ...prev,
              message: "Asignatura creada con exito",
              typeNotification: "success",
            }));
          } else if( operation == NOTIFICATION.EDIT ){
            setNotification(prev => ({
              ...prev,
              message: "Asignatura actualizada con exito",
              typeNotification: "info",
            }));
          } else if ( operation == NOTIFICATION.DELETE ){
            setNotification(prev => ({
              ...prev,
              message: "Asignatura eliminada con exito",
              typeNotification: "success",
            }));
          }
        
        } else {
          setNotification(prev => ({
            ...prev,
            message: status.error || "Unknown error",
            typeNotification: "error",
          }));
    
    
          if(status.error == "Unauthorized"){
             setTimeout( ()=> {
              deleteAllBrowserData();
              navigate(APP_ROUTES.LOGIN);
             }, 2000 )
          }
        }
      };

      const loadingEfect = () => {
        setIsLoading(true);
        setTimeout( async ()=> {
         setIsLoading(false);
        }, 1000 )
      }

    const [group, setGroup] = useState<GroupInterface>({
      id: -1,
      key: "",
      name: "",
    });

    const createNewGroup = () => {
      setHeaderMessage(PROFESSOR_GROUP_MODAL_TIPE.CREATE);
      setIsModalOpen(true);
    };

    const fetchGroups = async () => {
      const groupsData = await ProfessorGroupModel.getAllGroups();
      let data: GroupInterface[] = groupsData.data;

       if(data){
              dispatchProfessor(setGroups(data));
            } else {
              dispatchProfessor(setGroups([]));
              handleNotification( NOTIFICATION.DELETE , groupsData);
              setTimeout(() => {
                deleteAllBrowserData();
                navigate(APP_ROUTES.LOGIN);
              }, 2000);
            }
    };

    const validateFieldsToCreateOrUpdategroup = (): boolean => {
        

            if (name.length < 4) {
              dispatchProfessor(setErrorMessageProfessorGroup("Nombre debe tener más de 3 caracteres"));
              return false;
            } else if(name.length > 8){
                dispatchProfessor(setErrorMessageProfessorGroup("Nombre debe tener menos de 9 caracteres"));
                return false;
            } else if(groupPassword.length < 4){
                dispatchProfessor(setErrorMessageProfessorGroup("Contraseña debe tener más de 3 caracteres"));
                return false;
            } else if(groupPassword.length > 8){
                dispatchProfessor(setErrorMessageProfessorGroup("Contraseña debe tener menos de 9 caracteres"));
                return false;
            }
            dispatchProfessor(setErrorMessageProfessorGroup(null));
            return true;
    }

    const handleActionsModal: HandleActions<GroupInterface> = {
      onEdit: () => {
        createOrUpdateGroup();
      },
      onDelete: () => {},
      onCancel: () => {
        cleanAllDataInstancesAndModals();
      },
    };

    const createOrUpdateGroup = async () => {

      if (headerMessage == PROFESSOR_GROUP_MODAL_TIPE.CREATE) {
        if(validateFieldsToCreateOrUpdategroup()){
            let newGroup: GroupRequestInterface = {
                name: name,
                key: groupPassword,
              };

            loadingEfect();

            const status = await ProfessorGroupModel.createGroup(newGroup);

            setUpdateView(!updateView);

            handleNotification( NOTIFICATION.CREATE , status);

            cleanAllDataInstancesAndModals();
        }
      } else if (headerMessage == PROFESSOR_GROUP_MODAL_TIPE.EDIT) {
        
        if(validateFieldsToCreateOrUpdategroup()){
            let newGroup: GroupRequestInterface = {
                name: name,
                key: groupPassword,
              };

              loadingEfect()

              const status = await ProfessorGroupModel.updateGroup(group.id, newGroup);

            setUpdateView(!updateView);

            handleNotification( NOTIFICATION.EDIT , status);

            cleanAllDataInstancesAndModals();
        }
        
      }
      
    };

    const handleActionsGroupDeleteModal: HandleActions<GroupInterface> = {
      onEdit: () => {},
      onDelete: () => {
        DeleteGroup();
      },
      onCancel: () => {
        cleanAllDataInstancesAndModals();
      },
    };

    const DeleteGroup = () => {
      DeleteSpecificGroup(group);
      cleanAllDataInstancesAndModals();
    };

    const DeleteSpecificGroup = async (group: GroupInterface) => {

       loadingEfect()

      const status = await ProfessorGroupModel.deleteGroup(group.id);
       
      setUpdateView(!updateView);

      handleNotification( NOTIFICATION.DELETE , status);
    };

    const handleActionsGroupModal: HandleActionsGroup<GroupInterface> = {
      onView: (item) => {
        accessToSpecificGroupStudentInfo(item);
      },
      onEdit: (item) => {
        handleGroupCardOnEdit(item);
      },
      onDelete: (item) => {
        handleGroupCardOnDelete(item);
      },
    };

     const accessToSpecificGroupStudentInfo = (groupInfo: GroupInterface) => {
          navigate(`${PROFESSOR_ROUTES.SPECIFIC_GROUP_INFO}${groupInfo.name}`, {
            state: { groupInfo: groupInfo }
          });
        };

    const handleGroupCardOnEdit = (item: GroupInterface) => {
      setGroup(item);
      setName(item.name);
      setGroupPassword(item.key);
      setHeaderMessage(PROFESSOR_GROUP_MODAL_TIPE.EDIT);
      setIsModalOpen(true);
    };

    const handleGroupCardOnDelete = (item: GroupInterface) => {
      setGroup(item);
      setIModalDeleteOpen(true);
    };

    const cleanAllDataInstancesAndModals = () => {
      setGroup({
        id: -1,
        key: "",
        name: "",
      });
      setName("");
      setGroupPassword("");
      setIsModalOpen(false);
      setHeaderMessage("");
      setIModalDeleteOpen(false);
    };

    return {
      groups,
      group,
      headerMessage,
      isModalOpen,
      isModalDeleteOpen,
      createNewGroup,
      handleActionsModal,
      handleActionsGroupDeleteModal,
      handleActionsGroupModal,
      fetchGroups,
      updateView,
      DeleteSpecificGroup,
      name,
      setName,
      groupPassword,
      setGroupPassword,
      notification,
      isVisibleNotifcation,
      setIsVisibleNotifcation,
      isLoading,
    };
  };
