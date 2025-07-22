import { useState } from "react";
import {
  ArrayCurrentSubjectWithExpandedResponse,
  CurrentSubjectResponse,
  deleteAllBrowserData,
  HandleActions,
  NOTIFICATION,
  NotificationInfoInteface,
  ResponseInterface,
} from "../../../shared";
import { setIModalStudentCurrentSubjectOpen, StudentCurrentSubjectModel } from "../model";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../routes";
import { setIsChatModalOpen } from "../../chat";

interface UseStudentCurrentSubjectController {
  currentCourseResourcesForAccordeon: ArrayCurrentSubjectWithExpandedResponse[];
  isOpenItemWelcomeToCourse: boolean;
  setIsOpenItemWelcomeToCourse: (e: boolean) => void;
  isOpenTourOnCourse: boolean;
  setIsOpenTourOnCourse: (e: boolean) => void;
  progresBarPosition: number;
  setProgresBarPosition: (e: number) => void;
  handleChangeVisibilityOfElementOnAccordeon: (e: number) => void;
  fetchALLCourseResources: (e: number) => Promise<void>;
  handleActionsModal: HandleActions<String>;
  isOpenChatModal: boolean;
  openResource: (e: string) => void;
  resourceUrl: string;
  openChat: () => void;
  isModalOpen: boolean;
  isOpenResource: boolean;
  headerMessage: string;
  notification: NotificationInfoInteface;
  isVisibleNotifcation: boolean;
  setIsVisibleNotifcation: (e: boolean) => void;
}

export const useStudentCurrentSubjectController =
  (): UseStudentCurrentSubjectController => {
    const dispatchStudentCurrentSubject = useDispatch<AppDispatch>();
    const isOpenChatModal = useSelector<RootState, boolean>(
      (store) => store.chat.isChatModalOpen
    );

    const isModalOpen = useSelector<RootState, boolean>(
        (store) => store.student.isModalStudentCurrentSubjectOpen,
      );

    const navigate = useNavigate();
    const [isOpenResource, setIsOpenResource] = useState(false);
    const [headerMessage, setHeaderMessage] = useState("");
    const [resourceUrl, setResourceUrl] = useState("");

    const [
      currentCourseResourcesForAccordeon,
      setCurrentCourseResourcesForAccordeon,
    ] = useState<ArrayCurrentSubjectWithExpandedResponse[]>([]);

     const [isOpenItemWelcomeToCourse, setIsOpenItemWelcomeToCourse] = useState(true);
     const [isOpenTourOnCourse, setIsOpenTourOnCourse] = useState(false);
     const [progresBarPosition, setProgresBarPosition] = useState(0);

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
            message: "Recursos del curso creados con exito",
            typeNotification: "success",
          }));
        } else if (operation == NOTIFICATION.EDIT) {
          setNotification((prev) => ({
            ...prev,
            message: "Recursos del curso actualizados con exito",
            typeNotification: "info",
          }));
        } else if (operation == NOTIFICATION.DELETE) {
          setNotification((prev) => ({
            ...prev,
            message: "Recursos del curso eliminados con exito",
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

    const fetchALLCourseResources = async (idSubject: number) => {
      const response =
        await StudentCurrentSubjectModel.getAllCurrentStudentSubjects(
          idSubject
        );

      if (response.error == "Unauthorized") {
        setCurrentCourseResourcesForAccordeon([]);
        handleNotification(NOTIFICATION.DELETE, response);
        setTimeout(() => {
          deleteAllBrowserData();
          navigate(APP_ROUTES.LOGIN);
        }, 2000);
      } else {
        const data = response.data as Record<string, CurrentSubjectResponse[]>;
        const currentSubjectResourcesForAccordion: ArrayCurrentSubjectWithExpandedResponse[] =
          Object.entries(data).map(([key, resources]) => ({
            expandedElement: true,
            section: { [key]: resources },
          }));

        setCurrentCourseResourcesForAccordeon(
          currentSubjectResourcesForAccordion
        );
      }
    };

    const handleActionsModal: HandleActions<String> = {
      onEdit: () => {
      },
      onDelete: () => {},
      onCancel: () => {
        cleanAllDataInstancesAndModals();
      },
    };

    const openResource = (url: string) => {
      dispatchStudentCurrentSubject(setIModalStudentCurrentSubjectOpen(true));
      setIsOpenResource(true);
      setHeaderMessage("Recurso");
      setResourceUrl(url);
    }

    const openChat = () => {
      dispatchStudentCurrentSubject(setIModalStudentCurrentSubjectOpen(true));
      setHeaderMessage("OZI");
      dispatchStudentCurrentSubject(setIsChatModalOpen(true));
    };

    const handleChangeVisibilityOfElementOnAccordeon = (index: number) => {
      setCurrentCourseResourcesForAccordeon((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, expandedElement: !item.expandedElement }
            : item
        )
      );
    };

    const cleanAllDataInstancesAndModals = () => {
      dispatchStudentCurrentSubject(setIModalStudentCurrentSubjectOpen(false));
      setIsOpenResource(false);
      setHeaderMessage("");
      dispatchStudentCurrentSubject(setIsChatModalOpen(false));
    };

    return {
      currentCourseResourcesForAccordeon,
      isOpenItemWelcomeToCourse,
      setIsOpenItemWelcomeToCourse,
      isOpenTourOnCourse,
      setIsOpenTourOnCourse,
      progresBarPosition,
      setProgresBarPosition,
      handleChangeVisibilityOfElementOnAccordeon,
      fetchALLCourseResources,
      handleActionsModal,
      isOpenChatModal,
      openResource,
      resourceUrl,
      openChat,
      isModalOpen,
      isOpenResource,
      headerMessage,
      notification,
      isVisibleNotifcation,
      setIsVisibleNotifcation,
    };
  };
