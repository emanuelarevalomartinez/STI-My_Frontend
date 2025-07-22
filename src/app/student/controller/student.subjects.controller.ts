import { useState } from "react";
import { useNavigate } from "react-router";
import {
  deleteAllBrowserData,
  HandleActions,
  HandleActionsStudentSubjects,
  NOTIFICATION,
  NotificationInfoInteface,
  ResponseInterface,
  StudentSubjectsRequestInterface,
  SubjectInterface,
} from "../../../shared";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { APP_ROUTES, STUDENT_ROUTES } from "../../../routes";
import {
  setErrorMessageStudentSubjects,
  setStudentSubjects,
  StudentSubjectsModel,
} from "../model";

interface UseStudentSubjectsController {
  studentSubjects: SubjectInterface[];
  subjectStudentData: SubjectInterface;
  isModalOpen: boolean;
  headerMessage: string;
  handleActionsModal: HandleActions<SubjectInterface>;
  handleActionsStudentSubjectsModal: HandleActionsStudentSubjects<SubjectInterface>;
  fetchStudentSubjects: () => Promise<void>;
  keyForSubject: string;
  setKeyForSubject: (e: string) => void;
  notification: NotificationInfoInteface;
  isVisibleNotifcation: boolean;
  setIsVisibleNotifcation: (e: boolean) => void;
  isLoading: boolean;
}

export const useStudentSubjectsController =
  (): UseStudentSubjectsController => {
    const dispatchStudent = useDispatch<AppDispatch>();
    const studentSubjects = useSelector<RootState, SubjectInterface[]>(
      (store) => store.student.studentSubjects
    );

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [headerMessage, setHeaderMessage] = useState("");

    const [keyForSubject, setKeyForSubject] = useState("");

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
            message: "Acceso a curso exitoso",
            typeNotification: "success",
          }));
        } else if (operation == NOTIFICATION.EDIT) {
          setNotification((prev) => ({
            ...prev,
            message: "Curso actualizado con exito",
            typeNotification: "info",
          }));
        } else if (operation == NOTIFICATION.DELETE) {
          setNotification((prev) => ({
            ...prev,
            message: "Error de acceso al curso",
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

    const [subjectStudentData, setSubjectStudentData] =
      useState<SubjectInterface>({
        id: -1,
        image: "",
        subjectName: "",
      });

    const loadingEfect = () => {
      setIsLoading(true);
      setTimeout(async () => {
        setIsLoading(false);
      }, 1000);
    };

    const fetchStudentSubjects = async () => {
      const subjectStudentDatas =
        await StudentSubjectsModel.getAllCurrentStudentSubjects();
      let data: SubjectInterface[] = subjectStudentDatas.data;

      if (data) {
        const subjectsWithImages = await Promise.all(
          data.map(async (subject) => {
            const imageResponse =
              await StudentSubjectsModel.getCurrentImageAsociateToStudentSubject(
                subject.id
              );
            return {
              ...subject,
              image: imageResponse.success ? imageResponse.data : null,
            };
          })
        );
        dispatchStudent(setStudentSubjects(subjectsWithImages));
      } else {
        dispatchStudent(setStudentSubjects([]));
        handleNotification(NOTIFICATION.DELETE, subjectStudentDatas);
        setTimeout(() => {
          deleteAllBrowserData();
          navigate(APP_ROUTES.LOGIN);
        }, 2000);
      }
    };

    const handleActionsModal: HandleActions<SubjectInterface> = {
      onEdit: () => {
        registerStudentOnCourse();
      },
      onDelete: () => {},
      onCancel: () => {
        cleanAllDataInstancesAndModals();
      },
    };

    const registerStudentOnCourse = async () => {
      if (validateFieldsToRegisterAStudentOnACourse()) {
        let registerData: StudentSubjectsRequestInterface;
        registerData = {
          key: keyForSubject,
        };
        const response = await StudentSubjectsModel.registerStudentOnCourse(
          registerData
        );
        if (response.error) {
          
          dispatchStudent(
            setErrorMessageStudentSubjects(
              response.error
            ))
        } else {
          const verifyStudentIsAlreadyOnSubjectCourse = await StudentSubjectsModel.verifyIfStudentIsOnGroup(
            subjectStudentData.id
          );

          if(verifyStudentIsAlreadyOnSubjectCourse.error){
            cleanAllDataInstancesAndModals();
            handleNotification(NOTIFICATION.DELETE, verifyStudentIsAlreadyOnSubjectCourse);
          } else {
            let isOnGroupOfTheSelectedSubject = verifyStudentIsAlreadyOnSubjectCourse.data.isEnroled;
            if(!isOnGroupOfTheSelectedSubject){
              dispatchStudent(
                setErrorMessageStudentSubjects(
                  "La clave no corresponde a esta asignatura"
                ))
            } else {
              accessToCourse(subjectStudentData);
              cleanAllDataInstancesAndModals();
            }
          }
        }
      }
    };

    const validateFieldsToRegisterAStudentOnACourse = (): boolean => {
      if (keyForSubject.length < 4) {
        dispatchStudent(
          setErrorMessageStudentSubjects(
            "Contraseña debe tener más de 3 caracteres"
          )
        );
        return false;
      } else if (keyForSubject.length > 8) {
        dispatchStudent(
          setErrorMessageStudentSubjects(
            "Contraseña debe tener menos de 9 caracteres"
          )
        );
        return false;
      }
      dispatchStudent(setErrorMessageStudentSubjects(null));
      return true;
    };

    const accessToCourse = (subjectInfo: SubjectInterface) => {
      navigate(`${STUDENT_ROUTES.CURRENT_SUBJECT}${subjectInfo.subjectName}`, {
        state: { subjectInfo: subjectInfo }
      });
    };

    const handleActionsStudentSubjectsModal: HandleActionsStudentSubjects<SubjectInterface> =
      {
        onAccess: async (item) => {
          setSubjectStudentData(item);
          handleOnAccesSubjectCard(item);
        },
      };

    const handleOnAccesSubjectCard = async (item: SubjectInterface) => {
      const response = await StudentSubjectsModel.verifyIfStudentIsOnGroup(
        item.id
      );
      let isOnGroup = response.data.isEnroled;
      if (isOnGroup) {
        accessToCourse(item);
      } else {
        setIsModalOpen(true);
      }
    };

    const cleanAllDataInstancesAndModals = () => {
      setSubjectStudentData({
        id: -1,
        image: "",
        subjectName: "",
      });
      setKeyForSubject("");
      setIsModalOpen(false);
      setHeaderMessage("");
      dispatchStudent(setErrorMessageStudentSubjects(null));
    };

    return {
      studentSubjects,
      subjectStudentData,
      isModalOpen,
      headerMessage,
      handleActionsModal,
      handleActionsStudentSubjectsModal,
      fetchStudentSubjects,
      keyForSubject,
      setKeyForSubject,
      notification,
      isVisibleNotifcation,
      setIsVisibleNotifcation,
      isLoading,
    };
  };
