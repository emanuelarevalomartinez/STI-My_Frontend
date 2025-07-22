import { useDispatch, useSelector } from "react-redux";
import { ProfessorSectionModel, setErrorMessageProfessorSection, setResourcesToAsignateASection, setSections } from "../model";
import { AppDispatch, RootState } from "../../../store/store";
import {
  deleteAllBrowserData,
  HandleActions,
  HandleActionsSection,
  NOTIFICATION,
  NotificationInfoInteface,
  PaginationInterface,
  PROFESSOR_SECTION_MODAL_TIPE,
  ResourcesToAsignateASectionInterface,
  ResponseInterface,
  SectionAsignateResourcesRequestInterface,
  SectionInterface,
  SectionRequestInterface,
} from "../../../shared";
import { useNavigate } from "react-router";
import { useState } from "react";
import { APP_ROUTES } from "../../../routes";

interface UseProfessorSectionController {
  updateView: boolean;
  updateViewAsociateResourcesToASecction: boolean;
  isModalOpen: boolean;
  isModalDeleteOpen: boolean;
  headerMessage: string;
  section: SectionInterface;
  sections: SectionInterface[];
  resourcesToAsignateASection: ResourcesToAsignateASectionInterface[];
  existSomeResource: boolean;
  addOrQuitResourceOnListToAsignASection: (e: number, f: boolean) => void;
  paginationResourcesAsignatesToASection: PaginationInterface;
  previewPage: () => Promise<void>;
  nextPage: () => Promise<void>;
  name: string;
  setName: (e: string) => void;
  numberSession: string;
  setNumberSession: (e: string) => void;
  description: string | undefined;
  setDescription: (e: string) => void;
  withDescription: boolean;
  setWithDescription: (e: boolean) => void;
  handleActionsModal: HandleActions<SectionInterface>;
  handleActionsSectionModal: HandleActionsSection<SectionInterface>;
  handleActionsSectionDeleteModal: HandleActions<SectionInterface>;
  fetchSections: () => Promise<void>;
  createNewSection: () => void;
  notification: NotificationInfoInteface;
  isVisibleNotifcation: boolean;
  setIsVisibleNotifcation: (e: boolean) => void;
  isLoading: boolean;
}

export const useProfessorSectionController =
  (): UseProfessorSectionController => {

    const dispatchProfessor = useDispatch<AppDispatch>();
    const sections = useSelector<RootState, SectionInterface[]>(
      (store) => store.professor.sections
    );

    const resourcesToAsignateASection = useSelector<RootState, ResourcesToAsignateASectionInterface[]>(
      (store) => store.professor.resourcesToAsignateASection
    );

    const navigate = useNavigate();

    const [updateView, setUpdateView] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIModalDeleteOpen] = useState(false);
    const [headerMessage, setHeaderMessage] = useState("");

    const [sectionWithTheirNewAsociatedResources, setSectionWithTheirNewAsociatedResources] = useState<SectionAsignateResourcesRequestInterface>({
      idSession: -1,
      idsResources: [],
    });

    const [updateViewAsociateResourcesToASecction, setUpdateViewAsociateResourcesToASecction] = useState(false);
    const [existSomeResource, setExistSomeResource] = useState(false);


    const [paginationResourcesAsignatesToASection, setPaginationResourcesAsignatesToASection] = useState({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });

    const [isLoading, setIsLoading] = useState(false);

    const [isVisibleNotifcation, setIsVisibleNotifcation] = useState(false);

    const [notification, setNotification] = useState<NotificationInfoInteface>({
      message: "",
      typeNotification: "error",
    });

    const [name, setName] = useState("");
    const [numberSession, setNumberSession] = useState("");
    const [description, setDescription] = useState<string | undefined>("");
    const [withDescription, setWithDescription] = useState(false);

    const handleNotification = (
      operation: NOTIFICATION,
      status: ResponseInterface
    ) => {
      setIsVisibleNotifcation(true);

      if (status.success) {
        if (operation == NOTIFICATION.CREATE) {
          setNotification((prev) => ({
            ...prev,
            message: "Operación exitosa",
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

    const [section, setSection] = useState<SectionInterface>({
      id: -1,
      name: "",
      numberSession: "",
      description: "",
    });

    const createNewSection = () => {
      setHeaderMessage(PROFESSOR_SECTION_MODAL_TIPE.CREATE);
      setIsModalOpen(true);
    };

    const fetchSections = async () => {
      const sectionData = await ProfessorSectionModel.getAllSections();
      let data: SectionInterface[] = sectionData.data;
      if(data){
        dispatchProfessor(setSections(data));
      } else {
        dispatchProfessor(setSections([]));
        handleNotification( NOTIFICATION.DELETE , sectionData);
        setTimeout(() => {
          deleteAllBrowserData();
          navigate(APP_ROUTES.LOGIN);
        }, 2000);
      }
    };


        const validateFieldsToCreateOrUpdateSetion = (): boolean => {
    
                if (name.length < 4) {
                  dispatchProfessor(setErrorMessageProfessorSection("Nombre debe tener más de 3 caracteres"));
                  return false;
                } else if(name.length > 70){
                    dispatchProfessor(setErrorMessageProfessorSection("Nombre debe tener menos de 70 caracteres"));
                    return false;
                } else if(numberSession.length == 0){
                    dispatchProfessor(setErrorMessageProfessorSection("Número de sección no puede estar vacío"));
                    return false;
                } else if(withDescription && (!description || description.length === 0)){
                    dispatchProfessor(setErrorMessageProfessorSection("Al seleccionar descripción no puede estar vacía"));
                    return false;
                }
                dispatchProfessor(setErrorMessageProfessorSection(null));
                return true;
        }

        const validateSomeResourceIsSelected = (): boolean => {
          if (sectionWithTheirNewAsociatedResources.idsResources.length <= 0) {
            dispatchProfessor(setErrorMessageProfessorSection("Debe seleccional al menus un recurso"));
            return false;
          }
          dispatchProfessor(setErrorMessageProfessorSection(null));
          return true;
  }

    const handleActionsModal: HandleActions<SectionInterface> = {
      onEdit: () => {
        createOrUpdateSection();
      },
      onDelete: () => {},
      onCancel: () => {
        cleanAllDataInstancesAndModals();
      },
    };

    const createOrUpdateSection = async () => {

      if (headerMessage == PROFESSOR_SECTION_MODAL_TIPE.CREATE) {
          if(validateFieldsToCreateOrUpdateSetion()){

        let newSection: SectionRequestInterface = {
          name: name,
          numberSession: numberSession,
          description: description,
        };

        loadingEfect();

        const status = await ProfessorSectionModel.createSection(newSection);

        setUpdateView(!updateView);

        handleNotification(NOTIFICATION.CREATE, status);

        cleanAllDataInstancesAndModals();
          }
      } else if (headerMessage == PROFESSOR_SECTION_MODAL_TIPE.EDIT) {
          if(validateFieldsToCreateOrUpdateSetion()){
            
        let newSection: SectionRequestInterface;

        if(withDescription){
          newSection = {
            name: name,
            numberSession: numberSession,
            description: description,
          }
        } else {
          newSection = {
            name: name,
            numberSession: numberSession,
            description: "",
          }
        }

        loadingEfect();

        const status = await ProfessorSectionModel.updateSection(
          section.id,
          newSection
        );

        setUpdateView(!updateView);

        handleNotification(NOTIFICATION.EDIT, status);

        cleanAllDataInstancesAndModals();
          }
      } else if(headerMessage == PROFESSOR_SECTION_MODAL_TIPE.ADD_RESOURCES){

        if(validateSomeResourceIsSelected()){

          loadingEfect();

          const status = await ProfessorSectionModel.asignateResourcesToASelectedSection(sectionWithTheirNewAsociatedResources);
  
          setUpdateView(!updateView);
  
          handleNotification(NOTIFICATION.CREATE, status);
  
          cleanAllDataInstancesAndModals();

          
         }
        }
    };

    const handleActionsSectionDeleteModal: HandleActions<SectionInterface> = {
      onEdit: () => {},
      onDelete: () => {
        DeleteSection();
      },
      onCancel: () => {
        cleanAllDataInstancesAndModals();
      },
    };

    const DeleteSection = () => {
      DeleteSpecificSection(section);
      cleanAllDataInstancesAndModals();
    };

    const DeleteSpecificSection = async (section: SectionInterface) => {
      loadingEfect();

      const status = await ProfessorSectionModel.deleteSection(section.id);

      setUpdateView(!updateView);

      handleNotification(NOTIFICATION.DELETE, status);
    };

    const handleActionsSectionModal: HandleActionsSection<SectionInterface> = {
      onAsignResource: (item) => {
        handleSectionCardOnAsignResources(item);
      },
      onEdit: (item) => {
        handleSectionCardOnEdit(item);
      },
      onDelete: (item) => {
        handleSectionCardOnDelete(item);
      },
    };

    const handleSectionCardOnAsignResources = async (item: SectionInterface) => {
      setSection(item);
      setSectionWithTheirNewAsociatedResources({
        idSession: item.id,
        idsResources: [],
      })
      setHeaderMessage(PROFESSOR_SECTION_MODAL_TIPE.ADD_RESOURCES);
        await getAllResourcesWhitoutASectionAsignated();
        setIsModalOpen(true);
    };

      const getAllResourcesWhitoutASectionAsignated = async (
          limit?: number,
          page?: number
        ): Promise<ResourcesToAsignateASectionInterface[]> => {
          const getAllResourcesResponse =
            await ProfessorSectionModel.getAllResourcesToAsignASection(limit, page);
    
          if (getAllResourcesResponse && getAllResourcesResponse.success) {
            setPaginationResourcesAsignatesToASection((prevState) => ({
              ...prevState,
              page: getAllResourcesResponse.data.page,
              limit: getAllResourcesResponse.data.limit,
              total: getAllResourcesResponse.data.total,
              totalPages: getAllResourcesResponse.data.totalPages,
            }));
    
            const resources: ResourcesToAsignateASectionInterface[] =
              getAllResourcesResponse.data.resources.map(
                (resource: ResourcesToAsignateASectionInterface) => ({
                  ...resource,
                  type:
                    resource.type == "reflexive"
                      ? "Reflexivo"
                      : resource.type == "pragmatic"
                      ? "Pragmático"
                      : resource.type == "theoretical"
                      ? "Teórico"
                      : "",
                })
              );

              if(resources.length === 0){
                setExistSomeResource(false);
              } else {
                setExistSomeResource(true);
              }

              let resourcesWithoutAsignatedSection = resources.filter( (resource) =>  resource.session === null );
              dispatchProfessor(setResourcesToAsignateASection(resourcesWithoutAsignatedSection));
            return resourcesWithoutAsignatedSection;
          } else {
            dispatchProfessor(setResourcesToAsignateASection([]));
            setExistSomeResource(false);
            return [];
          }
        };

    const handleSectionCardOnEdit = (item: SectionInterface) => {
      setSection(item);
      setName(item.name);
      setNumberSession(item.numberSession);
      setDescription(item.description);
      setWithDescription(item.description != null && item.description != "");
      setHeaderMessage(PROFESSOR_SECTION_MODAL_TIPE.EDIT);
      setIsModalOpen(true);
    };

    const handleSectionCardOnDelete = (item: SectionInterface) => {
      setSection(item);
      setIModalDeleteOpen(true);
    };

    const addOrQuitResourceOnListToAsignASection = (idResource: number, shouldAdd: boolean) => {
      let elementsOnCurrentArray: number[] = sectionWithTheirNewAsociatedResources.idsResources;
        if(shouldAdd == true){
         elementsOnCurrentArray.push(idResource);
         setSectionWithTheirNewAsociatedResources({
          idSession: section.id,
          idsResources: elementsOnCurrentArray,
         });
        } else {
          elementsOnCurrentArray = elementsOnCurrentArray.filter( (resource) => resource !== idResource );
          setSectionWithTheirNewAsociatedResources({
            idSession: section.id,
            idsResources: elementsOnCurrentArray,
           });
        }
    }

    const previewPage = async () => {
      if(paginationResourcesAsignatesToASection.page > 1) {
        dispatchProfessor(setErrorMessageProfessorSection(null));
        setSectionWithTheirNewAsociatedResources({
          idSession: -1,
          idsResources: [],
        })
        setUpdateViewAsociateResourcesToASecction(!updateViewAsociateResourcesToASecction);
        await getAllResourcesWhitoutASectionAsignated(paginationResourcesAsignatesToASection.limit, paginationResourcesAsignatesToASection.page - 1);
      }
    }
  
    const nextPage = async () => {
      if(paginationResourcesAsignatesToASection.page < paginationResourcesAsignatesToASection.totalPages) {
        dispatchProfessor(setErrorMessageProfessorSection(null));
        setSectionWithTheirNewAsociatedResources({
          idSession: -1,
          idsResources: [],
        })
        setUpdateViewAsociateResourcesToASecction(!updateViewAsociateResourcesToASecction);
        await getAllResourcesWhitoutASectionAsignated(paginationResourcesAsignatesToASection.limit, paginationResourcesAsignatesToASection.page + 1);
      }
    }

    const cleanAllDataInstancesAndModals = () => {
      setSection({
        id: -1,
        name: "",
        numberSession: "",
        description: "",
      });
      setName("");
      setNumberSession("");
      setDescription("");
      setWithDescription(false);
      setIsModalOpen(false);
      setHeaderMessage("");
      setIModalDeleteOpen(false);
      setPaginationResourcesAsignatesToASection({
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      });
      setSectionWithTheirNewAsociatedResources({
        idSession: -1,
        idsResources: [],
      })
      dispatchProfessor(setResourcesToAsignateASection([]));
      dispatchProfessor(setErrorMessageProfessorSection(null));
    };

    return {
      updateView,
      updateViewAsociateResourcesToASecction,
      isModalOpen,
      isModalDeleteOpen,
      headerMessage,
      fetchSections,
      resourcesToAsignateASection,
      existSomeResource,
      addOrQuitResourceOnListToAsignASection,
      paginationResourcesAsignatesToASection,
      previewPage,
      nextPage,
      name,
      setName,
      numberSession,
      setNumberSession,
      description,
      setDescription,
      withDescription,
      setWithDescription,
      handleActionsModal,
      handleActionsSectionModal,
      handleActionsSectionDeleteModal,
      section,
      sections,
      createNewSection,
      notification,
      isVisibleNotifcation,
      setIsVisibleNotifcation,
      isLoading,
    };
  };
