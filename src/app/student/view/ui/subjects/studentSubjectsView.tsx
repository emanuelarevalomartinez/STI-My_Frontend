import { useEffect } from "react";
import {
  CardStudentSubject,
  Loading,
  Modal,
  NotFoundData,
  Notification,
} from "../../../../../common";
import { formatTextWhithSpaces, SubjectInterface } from "../../../../../shared";
import { useStudentSubjectsController } from "../../../controller/student.subjects.controller";
import { ItemAccessToSpecificSubject } from "./components/item.accessToSpecificSubject";

export function StudentSubjectsView() {
  const {
    isModalOpen,
    isLoading,
    notification,
    isVisibleNotifcation,
    setIsVisibleNotifcation,
    headerMessage,
    subjectStudentData,
    studentSubjects,
    handleActionsModal,
    handleActionsStudentSubjectsModal,
    keyForSubject,
    setKeyForSubject,
    fetchStudentSubjects,
  } = useStudentSubjectsController();

  useEffect(() => {
    fetchStudentSubjects();
  }, []);

  return (
    <>
      {isLoading && <Loading />}

      <Notification
        isVisible={isVisibleNotifcation}
        setIsVisible={setIsVisibleNotifcation}
        typeNotification={notification.typeNotification}
        message={notification.message}
      />

      <Modal
        isOpen={isModalOpen}
        headerMessage={headerMessage}
        data={subjectStudentData}
        handleActions={handleActionsModal}
      >
        <ItemAccessToSpecificSubject keyForSubject={keyForSubject} setKeyForSubject={setKeyForSubject} />
      </Modal>
      <div>

        <div>
          <div
            className={`${
              studentSubjects.length != 0
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                : ""
            }`}
          >
            {studentSubjects.length != 0 ? (
              studentSubjects.map((subject, index) => (
                <CardStudentSubject<SubjectInterface>
                  key={index}
                  data={subject}
                  handleActions={handleActionsStudentSubjectsModal}
                  name={formatTextWhithSpaces(
                    subject.subjectName
                  ).toUpperCase()}
                />
              ))
            ) : (
              <NotFoundData />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
