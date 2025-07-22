import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  deleteAllBrowserData,
  HandleActions,
  HandleActionsResource,
  NOTIFICATION,
  NotificationInfoInteface,
  PaginationInterface,
  PROFESSOR_RESOURCE_MODAL_TIPE,
  RESOURCE_TYPE_BY_LEARNING_STYLE,
  ResourceInterface,
  ResourceRequestInterfaceUpdate,
  ResponseInterface,
  SectionResponseInterface,
  SectionTransformInterface,
} from "../../../shared";
import { useNavigate } from "react-router";
import { useState } from "react";
import { APP_ROUTES } from "../../../routes";
import {
  ProfessorResourceModel,
  setErrorMessageProfessorResource,
  setResources,
} from "../model";

interface UseProfessorResourcesController {
  resources: ResourceInterface[];
  resource: ResourceInterface;
  isModalOpen: boolean;
  isModalDeleteOpen: boolean;
  headerMessage: string;
  createNewResource: () => void;
  handleActionsModal: HandleActions<ResourceInterface>;
  handleActionsResourceDeleteModal: HandleActions<ResourceInterface>;
  handleActionsResourceModal: HandleActionsResource<ResourceInterface>;
  fetchResources: () => Promise<void>;
  pagination: PaginationInterface;
  previewPage: () => Promise<void>;
  nextPage: () => Promise<void>;
  typeResource: string;
  setTypeResource: (e: string) => void;
  descriptionOfTheResource?: string;
  setDescriptionOfTheResource: (e: string) => void;
  setMultimediaFile: (file: File | null) => void;
  withDescription: boolean;
  setWithDescription: (e: boolean) => void;
  availablesSections: SectionTransformInterface[];
  sectionAsignated: number;
  setSectionAsignated: (e: number) => void;
  updateView: boolean;
  notification: NotificationInfoInteface;
  isVisibleNotifcation: boolean;
  setIsVisibleNotifcation: (e: boolean) => void;
  isLoading: boolean;
}

export const useProfessorResourcesController =
  (): UseProfessorResourcesController => {
    const dispatchProfessor = useDispatch<AppDispatch>();
    const resources = useSelector<RootState, ResourceInterface[]>(
      (store) => store.professor.resources
    );

    const navigate = useNavigate();

    const [updateView, setUpdateView] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIModalDeleteOpen] = useState(false);
    const [headerMessage, setHeaderMessage] = useState("");

    const [pagination, setPagination] = useState({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });

    const [isLoading, setIsLoading] = useState(false);

    const [multimediaFile, setMultimediaFile] = useState<File | null>(null);
    const [typeResource, setTypeResource] = useState("");
    const [descriptionOfTheResource, setDescriptionOfTheResource] =
      useState("");
    const [withDescription, setWithDescription] = useState(false);
    const [availablesSections, setAvailablesSections] = useState<SectionTransformInterface[]>([{
      label: "",
      value: ""
    }]);
    
    const [sectionAsignated, setSectionAsignated] = useState(-1);

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
            message: "Recurso creado con exito",
            typeNotification: "success",
          }));
        } else if (operation == NOTIFICATION.EDIT) {
          setNotification((prev) => ({
            ...prev,
            message: "Recurso actualizado con exito",
            typeNotification: "info",
          }));
        } else if (operation == NOTIFICATION.DELETE) {
          setNotification((prev) => ({
            ...prev,
            message: "Recurso eliminado con exito",
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

    const [resource, setResource] = useState<ResourceInterface>({
      id: -1,
      type: "",
      description: "",
    });

    const createNewResource = () => {
      getAvailablesSectionsForProfessors();
      setHeaderMessage(PROFESSOR_RESOURCE_MODAL_TIPE.CREATE);
      setIsModalOpen(true);
    };

    const fetchResources = async () => {
      const resourcesData = await getAllResources(
        pagination.limit,
        pagination.page
      );
      dispatchProfessor(setResources(resourcesData));
    };

    const getAllResources = async (
      limit?: number,
      page?: number
    ): Promise<ResourceInterface[]> => {
      const getAllResourcesResponse =
        await ProfessorResourceModel.getAllResources(limit, page);

      if (getAllResourcesResponse && getAllResourcesResponse.success) {
        setPagination((prevState) => ({
          ...prevState,
          page: getAllResourcesResponse.data.page,
          limit: getAllResourcesResponse.data.limit,
          total: getAllResourcesResponse.data.total,
          totalPages: getAllResourcesResponse.data.totalPages,
        }));

        const resources: ResourceInterface[] =
          getAllResourcesResponse.data.resources.map(
            (resource: ResourceInterface) => ({
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
        return resources;
      } else {
        return [];
      }
    };

    const validateFieldsToCreateOrUpdategroup = (): boolean => {
      if (
        typeResource.length == 0 ||
        typeResource == RESOURCE_TYPE_BY_LEARNING_STYLE.ACTIVE
      ) {
        dispatchProfessor(
          setErrorMessageProfessorResource(
            "Debe selecionar un tipo de aprendizaje"
          )
        );
        return false;
      } else if (
        headerMessage == PROFESSOR_RESOURCE_MODAL_TIPE.CREATE &&
        multimediaFile == null
      ) {
        dispatchProfessor(
          setErrorMessageProfessorResource("Debe seleccionar un archivo")
        );
        return false;
      } else if (
        withDescription &&
        (!descriptionOfTheResource || descriptionOfTheResource.length === 0)
      ) {
        dispatchProfessor(
          setErrorMessageProfessorResource(
            "Al seleccionar descripción no puede estar vacía"
          )
        );
        return false;
      }
      dispatchProfessor(setErrorMessageProfessorResource(null));
      return true;
    };

    const handleActionsModal: HandleActions<ResourceInterface> = {
      onEdit: () => {
        createOrUpdateResource();
      },
      onDelete: () => {},
      onCancel: () => {
        cleanAllDataInstancesAndModals();
      },
    };

    const createOrUpdateResource = async () => {

      if (headerMessage == PROFESSOR_RESOURCE_MODAL_TIPE.CREATE) {
        if (validateFieldsToCreateOrUpdategroup()) {
          const formData = new FormData();
          formData.append("typeResource", typeResource);

          if (multimediaFile) {
            formData.append("file", multimediaFile);
          }

          if (descriptionOfTheResource) {
            formData.append("description", descriptionOfTheResource);
          }

          if (sectionAsignated !== undefined && !isNaN(sectionAsignated) && sectionAsignated !== -1) {
            formData.append("sessionId", String(sectionAsignated));
          }

          loadingEfect();

          const status = await ProfessorResourceModel.createResource(formData);

          setUpdateView(!updateView);

          handleNotification(NOTIFICATION.CREATE, status);

          cleanAllDataInstancesAndModals();
        }
      } else if (headerMessage == PROFESSOR_RESOURCE_MODAL_TIPE.EDIT) {
        if (validateFieldsToCreateOrUpdategroup()) {
          loadingEfect();

          let updateResource: ResourceRequestInterfaceUpdate;

          if (withDescription) {
              updateResource = {
                typeResource: typeResource,
                description: descriptionOfTheResource,
              };
            } else {
              updateResource = {
                typeResource: typeResource,
                description: "",
              };
          }

          const status = await ProfessorResourceModel.updateResource(
            resource.id,
            updateResource
          );

          setUpdateView(!updateView);

          handleNotification(NOTIFICATION.EDIT, status);

          cleanAllDataInstancesAndModals();
        }
      }
    };

    const handleActionsResourceDeleteModal: HandleActions<ResourceInterface> = {
      onEdit: () => {},
      onDelete: () => {
        DeleteResource();
      },
      onCancel: () => {
        cleanAllDataInstancesAndModals();
      },
    };

    const DeleteResource = () => {
      DeleteSpecificResource(resource);
      cleanAllDataInstancesAndModals();
    };

    const DeleteSpecificResource = async (resource: ResourceInterface) => {
      loadingEfect();

      const status = await ProfessorResourceModel.deleteResource(resource.id);

      setUpdateView(!updateView);

      handleNotification(NOTIFICATION.DELETE, status);
    };

    const handleActionsResourceModal: HandleActionsResource<ResourceInterface> =
      {
        onDownload: () => {},
        onEdit: (item) => {
          handleResourceCardOnEdit(item);
        },
        onDelete: (item) => {
          handleResourceCardOnDelete(item);
        },
      };

    const handleResourceCardOnEdit = (item: ResourceInterface) => {
      getAvailablesSectionsForProfessors();
      setResource(item);
      setWithDescription(item.description != null && item.description != "");
      if (item.description) {
        setDescriptionOfTheResource(item.description);
      }
      if (item.type == "Reflexivo") {
        setTypeResource(RESOURCE_TYPE_BY_LEARNING_STYLE.REFLEXIVE);
      } else if (item.type == "Pragmático") {
        setTypeResource(RESOURCE_TYPE_BY_LEARNING_STYLE.PRAGMATIC);
      } else if (item.type == "Teórico") {
        setTypeResource(RESOURCE_TYPE_BY_LEARNING_STYLE.THEORICAL);
      }
      setHeaderMessage(PROFESSOR_RESOURCE_MODAL_TIPE.EDIT);
      setIsModalOpen(true);
    };

    const handleResourceCardOnDelete = (item: ResourceInterface) => {
      setResource(item);
      setIModalDeleteOpen(true);
    };

    const previewPage = async () => {
      if (pagination.page > 1) {
        await getAllResources(pagination.limit, pagination.page - 1);
      }
    };

    const nextPage = async () => {
      if (pagination.page < pagination.totalPages) {
        await getAllResources(pagination.limit, pagination.page + 1);
      }
    };

      const getAvailablesSectionsForProfessors = async (): Promise<void> => {
        
          const response = await ProfessorResourceModel.getAllCurrentsSections();
          
          const getAllSubjectsResponse: SectionResponseInterface[] = response.data;

          if(getAllSubjectsResponse && getAllSubjectsResponse.length != 0){
            setAvailablesSections
            let sectionsToSee: SectionTransformInterface[] = [];
    
          for (let index = 0; index < getAllSubjectsResponse.length; index++) {
            sectionsToSee.push({
              value: getAllSubjectsResponse[index].id.toString(),
              label: getAllSubjectsResponse[index].name.toString(),
            });
          }
          setAvailablesSections(sectionsToSee);
          } else {
            setAvailablesSections([]);
          }
      }

    const cleanAllDataInstancesAndModals = () => {
      setResource({
        id: -1,
        type: "",
        description: "",
      });
      setMultimediaFile(null);
      setTypeResource("");
      setDescriptionOfTheResource("");
      setWithDescription(false);
      setIsModalOpen(false);
      setHeaderMessage("");
      setIModalDeleteOpen(false);
      setSectionAsignated(-1);
      setAvailablesSections([]);
    };

    return {
      resources,
      resource,
      isModalOpen,
      isModalDeleteOpen,
      headerMessage,
      createNewResource,
      handleActionsModal,
      handleActionsResourceDeleteModal,
      handleActionsResourceModal,
      fetchResources,
      pagination,
      previewPage,
      nextPage,
      typeResource,
      setTypeResource,
      descriptionOfTheResource,
      setDescriptionOfTheResource,
      setMultimediaFile,
      withDescription,
      availablesSections,
      sectionAsignated,
      setSectionAsignated,
      setWithDescription,
      updateView,
      notification,
      isVisibleNotifcation,
      setIsVisibleNotifcation,
      isLoading,
    };
  };
