import { useState } from "react";
import { HandleActions, HandleActionsTable, NotificationInfoInteface, PaginationInterface, ResponseInterface, UserInterface, UserRequestInterface } from "../../../shared/interfaces";
import { AdminUsersModel, setErrorMessageAdminUpdateUser, setUsers } from "../model";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useNavigate } from "react-router";
import { ADMIN_USER_MODAL_TIPE, deleteAllBrowserData, extremRegexEmail, NOTIFICATION } from "../../../shared";
import { APP_ROUTES } from "../../../routes";
import { ChartDataInterface } from "../../../common";
import { DEFAULT } from "../../auth/register/view/components/register.form.const";

interface AdminUsersController {
    updateView: boolean;
    isModalOpen: boolean;
    isModalDeleteOpen: boolean;
    users: UserInterface[];
    user: UserInterface;
    headerMessage: string;
    handleActionsModal: HandleActions<UserInterface>;
    HandleActionsUserTable: HandleActionsTable<UserInterface>;
    handleActionsUserDeleteModal: HandleActions<UserInterface>;
    fetchUsers: () =>  Promise<void>;
    pagination: PaginationInterface;
    previewPage: () => Promise<void>;
    nextPage: () => Promise<void>;
    role: string;
    searchTerm: string;
    setSearchTerm: (e: string) => void;
    userFullName: string;
    userEmail: string;
    userFacultad: string;
    setUserFullName: (e: string) => void;
    setUserEmail: (e: string) => void;
    setUserFacultad: (e: string) => void;
    search: () => void;
    handleRoleChange: (e: string) => void;
    notification: NotificationInfoInteface;
    isVisibleNotifcation: boolean;
    setIsVisibleNotifcation: (e: boolean) => void;
    chartData: ChartDataInterface[];
    initialData: ChartDataInterface[];
    fetchStudentLearningStyle: ()=> Promise<void>;
    isLoading: boolean;
}

export const useAdminUsersController = (): AdminUsersController => {

  const dispatchAdmin = useDispatch<AppDispatch>();
      const users = useSelector<RootState,UserInterface[]>(
        (store) => store.admin.users
      );
  
      const navigate = useNavigate();
  
      const [updateView, setUpdateView] = useState(false);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isModalDeleteOpen, setIModalDeleteOpen] = useState(false);
      const [headerMessage, setHeaderMessage] = useState("");
  
      const [isLoading, setIsLoading] = useState(false);
  
      const [isVisibleNotifcation, setIsVisibleNotifcation] = useState(false);
  
      const [notification, setNotification] = useState<NotificationInfoInteface>({
        message: "",
        typeNotification: "error",
      });

      const [role, setRole] = useState("");
      const [searchTerm, setSearchTerm] = useState("");
      const [userFullName, setUserFullName] = useState("");
      const [userEmail, setUserEmail] = useState("");
      const [userFacultad, setUserFacultad] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 1,
    totalPages: 1,
  });

     const [chartData, setChartData] = useState<ChartDataInterface[]>([]);
  
      const initialData: ChartDataInterface[] = [
          {
            style: "Activo",
            value: 0,
            fullMark: 100,
          },
          {
            style: "Reflexivo",
            value: 0,
            fullMark: 100,
          },
          {
            style: "Pragmático",
            value: 0,
            fullMark: 100,
          },
          {
            style: "Teórico",
            value: 0,
            fullMark: 100,
          },
        ];

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
              message: "Usuario actualizado con exito",
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
      

      const [user, setUser] = useState<UserInterface>({
            id: -1,
            username: "",
            fullname: "",
            email: "",
            facultad: "",
            role: "",
            active: false,
            createAt: "",
          });

  const fetchUsers = async () => {

    const usersData = await getAllUsers(pagination.limit, pagination.page, searchTerm, role);
    dispatchAdmin(setUsers(usersData));

  };

      const validateFieldsToUpdateUser = (): boolean => {
        if (
          userFullName.length <= 8
        ) {
          dispatchAdmin(setErrorMessageAdminUpdateUser("Nombre debe tener al menos 8 caracteres"));
          return false;
        } else if (
          !(extremRegexEmail.test(userEmail) && userEmail.length > 0)
        ) {
          dispatchAdmin(setErrorMessageAdminUpdateUser("Email no cumple con los requisitos"));
          return false;
        } else if (
          userFacultad.length <= 0 || userFacultad === DEFAULT
        ) {
          dispatchAdmin(setErrorMessageAdminUpdateUser("Seleccione una Facultad"));
          return false;
        }
        dispatchAdmin(setErrorMessageAdminUpdateUser(null));
        return true;
      };

  const handleActionsModal: HandleActions<UserInterface> = {
       onEdit: () => {
        updateOrGraphUser();
       },
       onDelete: () => {},
       onCancel: () => {
         cleanAllDataInstancesAndModals();
       },
     };

         const updateOrGraphUser = async () => {

          if (headerMessage == ADMIN_USER_MODAL_TIPE.EDIT){
              
               if(validateFieldsToUpdateUser()){

                let updateUser: UserRequestInterface = {
                  fullname: userFullName,
                  email: userEmail,
                  facultad: userFacultad,
                };

                loadingEfect();

                const status = await AdminUsersModel.updateUser(user.id,updateUser);
     
                setUpdateView(!updateView);
     
                handleNotification(NOTIFICATION.EDIT, status);
     
                cleanAllDataInstancesAndModals();
               }
            
          } else if(headerMessage == ADMIN_USER_MODAL_TIPE.CHART){
            setIsModalOpen(false);
          }
         };

          const handleActionsUserDeleteModal: HandleActions<UserInterface> = {
               onEdit: () => {},
               onDelete: () => {
                DeleteSpecificUser();
               },
               onCancel: () => {
                 cleanAllDataInstancesAndModals();
               },
             };

              const DeleteSpecificUser = () => {
                   DeleteSpecificSection(user);
                   cleanAllDataInstancesAndModals();
                 };
             
                 const DeleteSpecificSection = async (user: UserInterface) => {
                   loadingEfect();
             
                   const status = await AdminUsersModel.deleteUser(user.id);
             
                   setUpdateView(!updateView);
             
                   handleNotification(NOTIFICATION.DELETE, status);
                 };

               const HandleActionsUserTable: HandleActionsTable<UserInterface> = {
                onFastAction: (item) => {
                  handleUserTableOnFastAction(item);
                },
                onEdit: (item) => {
                  setUser(item);
                  setUserFullName(item.fullname);
                  setUserEmail(item.email);
                  setUserFacultad(item.facultad);
                  handleUserTableOnEdit(item);
                },
                onViewChart: (item) => {
                  handleUserTableOnViewChart(item);
                  
                },
                onDelete: (item) => {
                  handleUserTableOnDelete(item);
                },
                onCancel: () => () => () => {
                }
                };

                const handleUserTableOnFastAction = async (item: any) => {
                   const status = await AdminUsersModel.activateUser(item.id);

                   setUpdateView(!updateView);
             
                   handleNotification(NOTIFICATION.EDIT, status);
                }
            
                const handleUserTableOnEdit = (item: UserInterface) => {
                  setHeaderMessage(ADMIN_USER_MODAL_TIPE.EDIT);
                  setIsModalOpen(true);
                };
                const handleUserTableOnViewChart = (item: UserInterface) => {
                  setUser(item);
                  setHeaderMessage(ADMIN_USER_MODAL_TIPE.CHART);
                  setIsModalOpen(true);
                };
            
                const handleUserTableOnDelete = (item: UserInterface) => {
                  setUser(item);
                  setIModalDeleteOpen(true);
                };     

                const fetchStudentLearningStyle = async () => {
                     
                  const usersData = await AdminUsersModel.getStudentLearningStyle(user.id);
                  const valuesString = usersData.data.learningStyle;

                  if(usersData.success){
                    if(!valuesString){
                      setChartData([]);
                  } else {
                   const values = valuesString.split(',').map(Number);
                  
                   const updatedData = initialData.map((item, index) => ({
                       ...item,
                       value: values[index] || 0
                   }));
                   setChartData(updatedData);
                  }
                  } else {
                     setChartData([]);
                     handleNotification( NOTIFICATION.DELETE , usersData);
                        setTimeout(() => {
                          deleteAllBrowserData();
                          navigate(APP_ROUTES.LOGIN);
                        }, 2000);
                    }  
          };

       const cleanAllDataInstancesAndModals = () => {
          setUser({
            id: -1,
            username: "",
            fullname: "",
            email: "",
            facultad: "",
            role: "",
            active: false,
            createAt: "",
          })
           setUserFullName("");
           setUserEmail("");
           setUserFacultad("");
           setIsModalOpen(false);
           setHeaderMessage("");
           setIModalDeleteOpen(false);
           dispatchAdmin(setErrorMessageAdminUpdateUser(null));
         };

         const getAllUsers = async (limit?: number, page?: number, searchTerm?: string, role?: string): Promise<UserInterface[]> => {
    
          const getAllUsersResponse = await AdminUsersModel.getAllCurrentUsers(limit, page, searchTerm, role);
      
          if(getAllUsersResponse && getAllUsersResponse.success){
      
            setPagination(prevState => ({
              ...prevState,
              page: getAllUsersResponse.data.page,
              limit: getAllUsersResponse.data.limit,
              total: getAllUsersResponse.data.total,
              totalPages: getAllUsersResponse.data.totalPages
            }));
      
            const users: UserInterface[] = getAllUsersResponse.data.data.map( (user: UserInterface) => ({
              ...user,
              active: user.active ? "Activo" : "Inactivo",
              role: getRoleDisplayText(user.role),
            }));

            users.forEach( (user)=> {
             const dateCreateAt = new Date(Number(user.createAt));
    
             const options: Intl.DateTimeFormatOptions = {
               year: "numeric",
               month: "2-digit",
               day: "2-digit",
               hour: "2-digit",
               minute: "2-digit",
               hour12: true, 
             };
   
             user.createAt = dateCreateAt.toLocaleString('es-ES', options);
            } )
            return users;
          } else {
                handleNotification( NOTIFICATION.DELETE , getAllUsersResponse);
                setTimeout(() => {
                    deleteAllBrowserData();
                    navigate(APP_ROUTES.LOGIN);
                  }, 2000);
            return [];
          }
        }
      
      
        function getRoleDisplayText(role: string): string {
          switch(role) {
            case "professor_principal":
              return "Profesor Principal";
            case "estudiante":
              return "Estudiante";
            case "professor_auxiliar":
              return "Profesor Auxiliar";
            case "admin":
              return "Administrador";
            default:
              return role;
          }
        }
      
        const previewPage = async () => {
          if(pagination.page > 1) {
            await getAllUsers(pagination.limit, pagination.page - 1);
          }
        }
      
        const nextPage = async () => {
          if(pagination.page < pagination.totalPages) {
            await getAllUsers(pagination.limit, pagination.page + 1);
          }
        }
      
        const search = () => {
           getAllUsers(pagination.limit, pagination.page, searchTerm, role);
           setUpdateView(!updateView);
        }
      
        const handleRoleChange = (e: string) => {
          
          setPagination(prevState => ({
            ...prevState,
            page: 1,
          }));
      
          if(e == "default"){
             setRole("");
          } else {
            setRole(e);
          }
          setUpdateView(!updateView);
       }

  return {
    updateView,
    isModalOpen,
    isModalDeleteOpen,
    users,
    user,
    headerMessage,
    handleActionsModal,
    HandleActionsUserTable,
    handleActionsUserDeleteModal,
    fetchUsers,
    pagination,
    previewPage,
    nextPage,
    role,
    searchTerm,
    setSearchTerm,
    userFullName,
    userEmail,
    userFacultad,
    setUserFullName,
    setUserEmail,
    setUserFacultad,
    search,
    handleRoleChange,
    notification,
    isVisibleNotifcation,
    setIsVisibleNotifcation,
    chartData,
    initialData,
    fetchStudentLearningStyle,
    isLoading,
  };
};
