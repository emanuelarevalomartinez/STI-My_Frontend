import { useDispatch, useSelector } from "react-redux";
import { ADMIN_SUBJECTS_MODAL, deleteAllBrowserData, formatTextWithUnderscores, HandleActions, ModalInfoInterface, NOTIFICATION, NotificationInfoInteface, ResponseInterface, SubjectInterface } from "../../../shared";
import { AdminSubjectsModel, setErrorMessageAdminSubject, setSubjects } from "../model";
import { AppDispatch, RootState } from "../../../store/store";
import { useState } from "react";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../routes";


interface AdminSubjectsController {
    subjects: SubjectInterface[],
    updateView: boolean;
    isModalOpen: boolean,
    isModalDeleteOpen: boolean,
    modalInfo: ModalInfoInterface,
    subjectData: SubjectInterface,
    handleActionsModal: HandleActions<SubjectInterface>,
    handleActionsModalConfirmDelete: HandleActions<SubjectInterface>,
    handleActionsCardSubject: HandleActions<SubjectInterface>,
    newSubjectName: string,
    setNewSubjectName: (e: string) => void,
    currentImageUrl: string | null,
    setSelectedImage: (e: File | null) => void,
    addNewSubject: () => void,
    fetchSubjects: () => Promise<void>,
    notification: NotificationInfoInteface,
    isVisibleNotifcation: boolean,
    setIsVisibleNotifcation: (e: boolean) => void,
    isLoading: boolean,
}

export const useAdminSubjectsController = (): AdminSubjectsController => {

  const dispatchAdmin = useDispatch<AppDispatch>();
  const subjects = useSelector<RootState, SubjectInterface[]>( (store)=> store.admin.subjects );

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const [newSubjectName, setNewSubjectName] = useState("");

  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
  const [updateView, setUpdateView] = useState(false);

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

  const [subjectData, setSubjectData] = useState<SubjectInterface>({
    id: -1,
    image: "",
    subjectName: "",
  });

  const [modalInfo, setModalInfo] = useState<ModalInfoInterface>({
    headerMessage: "",
    typeOfModal: "",
  });

  const loadingEfect = () => {
    setIsLoading(true);
    setTimeout( async ()=> {
     setIsLoading(false);
    }, 1000 )
  }

  const fetchSubjects = async () => {

    const subjectData = await AdminSubjectsModel.getAllCurrentSubjects();
    let data: SubjectInterface[] = subjectData.data;

    if(data){
      const subjectsWithImages = await Promise.all(
        data.map(async (subject) => {
          const imageResponse =
            await AdminSubjectsModel.getCurrentImageAsociateToSubject(
              subject.id
            );
          return {
            ...subject,
            image: imageResponse.success ? imageResponse.data : null,
          };
        })
      );
      dispatchAdmin(setSubjects(subjectsWithImages));
    } else {
      dispatchAdmin(setSubjects([]));
      handleNotification( NOTIFICATION.DELETE , subjectData);
      setTimeout(() => {
        deleteAllBrowserData();
        navigate(APP_ROUTES.LOGIN);
     }, 2000);
  };
}

  const handleActionsModal: HandleActions<SubjectInterface> = {
    onEdit: (subject) => CreateOrUpdateSubject(subject),
    onDelete: () => ()=> { },
    onCancel: () => OnCancel(),
  };

  const handleActionsModalConfirmDelete: HandleActions<SubjectInterface> = {
    onEdit: () => ()=> {  },
    onDelete: (student) => DeleteSpecificSubject(student),
    onCancel: () => OnCancel(),
  };

  const handleActionsCardSubject: HandleActions<SubjectInterface> = {
    onEdit: (student) => ShowEditSubjectModal(student),
    onDelete: (student) => ShowDeleteSubjectModal(student),
    onCancel: () => OnCancel(),
  };

  const addNewSubject = () => {
     setNewSubjectName("");
     setSelectedImage(null);
     setCurrentImageUrl(null);

      setModalInfo({
        headerMessage: "Crear Nueva Asignatura",
        typeOfModal: ADMIN_SUBJECTS_MODAL.CREATE,
      })
     setIsModalOpen(!isModalOpen);
  }


  const CreateOrUpdateSubject = async (subject: SubjectInterface) => {

    if(validateSubjectFields(newSubjectName)){
      const formData = new FormData();
      formData.append('subjectName', formatTextWithUnderscores(newSubjectName));
    
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
  
      if (modalInfo.typeOfModal === ADMIN_SUBJECTS_MODAL.CREATE) {

         loadingEfect()

         const status = await AdminSubjectsModel.createNewSubject(formData);
         handleNotification( NOTIFICATION.CREATE , status);

      } else if(modalInfo.typeOfModal == ADMIN_SUBJECTS_MODAL.EDIT){

          loadingEfect()

          const status = await AdminSubjectsModel.updateSubject(subject.id, formData);
          handleNotification( NOTIFICATION.EDIT , status);
      }

      setNewSubjectName("");
      setModalInfo({
        headerMessage: "",
        typeOfModal: "",
      })
      
      setIsModalOpen(false);
      setSelectedImage(null);
      setCurrentImageUrl(null);
      setUpdateView(!updateView)
    }
  }

  const  DeleteSpecificSubject = async (subject: SubjectInterface) => {

    setIsModalDeleteOpen(!isModalDeleteOpen);
    
    loadingEfect()

    const status = await AdminSubjectsModel.deleteSubject(subject.id);
    handleNotification( NOTIFICATION.DELETE , status);

    setUpdateView(!updateView);
  }

  const  ShowDeleteSubjectModal = (subject: SubjectInterface) => {
    setSubjectData(subject);
    setIsModalDeleteOpen(true);
  }

  const  ShowEditSubjectModal = (subject: SubjectInterface) => {
    
    const selectedSubject: SubjectInterface[] = subjects.filter( element => element.id == subject.id );
    setNewSubjectName(selectedSubject[0].subjectName);
    setCurrentImageUrl(selectedSubject[0].image || null);
    setSelectedImage(null);
    setIsModalOpen(true);
    setModalInfo({
      headerMessage: "Actualizar Asignatura",
      typeOfModal: ADMIN_SUBJECTS_MODAL.EDIT,
    })
    setSubjectData(selectedSubject[0]);
  }

  const OnCancel = () => {
    dispatchAdmin(setErrorMessageAdminSubject(null));
    setIsModalDeleteOpen(false);
    setIsModalOpen(false);
    setSubjectData({
      id: -1,
      subjectName: "",
      image: "",
    })
    setModalInfo({
      headerMessage: "",
      typeOfModal: "",
    })
    setNewSubjectName(""); 
    setSelectedImage(null);
    setCurrentImageUrl(null);
  }

  const validateSubjectFields = (subjectName: string): boolean => {

    if (!(subjectName.length >= 3 && subjectName.length > 0)) {
      dispatchAdmin(setErrorMessageAdminSubject("Nombre de asignatura debe tener al menos 3 caracteres"));
      return false;
    }
    dispatchAdmin(setErrorMessageAdminSubject(null));
    return true;
  };

  return {
    subjects,
    updateView,
    isModalOpen,
    isModalDeleteOpen,
    modalInfo,
    subjectData,
    handleActionsModal,
    handleActionsModalConfirmDelete,
    handleActionsCardSubject,
    newSubjectName,
    setNewSubjectName,
    currentImageUrl,
    setSelectedImage,
    addNewSubject,
    fetchSubjects,
    notification,
    isVisibleNotifcation,
    setIsVisibleNotifcation,
    isLoading,
  };
};
