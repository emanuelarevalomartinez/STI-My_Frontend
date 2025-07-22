import { useEffect } from "react";
import { ADMIN_SUBJECTS_MODAL, formatTextWhithSpaces, SubjectInterface } from "../../../../../shared";
import { CardSubject, Loading, Modal, ModalConfirmDelete, NotFoundData, Notification } from "../../../../../common";
import { Button } from "../../../../../common/buttons";
import { ItemNewSubject } from "./components/item.create.or.update.subject";
import { IoMdAdd } from "react-icons/io";
import { useAdminSubjectsController } from "../../../controller/admin.subjects.controller";

export function AdminSubjectsView() {
  const {
    subjects,
    isModalOpen,
    isModalDeleteOpen,
    modalInfo,
    updateView,
    subjectData,
    handleActionsModal,
    handleActionsCardSubject,
    handleActionsModalConfirmDelete,
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
  } = useAdminSubjectsController();

  useEffect(() => {
    fetchSubjects();
  }, [updateView]);

  return (
    <>

     { isLoading && <Loading/> }

      <Modal
        isOpen={isModalOpen}
        headerMessage={modalInfo.headerMessage}
        data={subjectData}
        handleActions={handleActionsModal}
      >
        <ItemNewSubject
          subjectName={newSubjectName}
          setNewSubjectName={setNewSubjectName}
          currentImage={currentImageUrl}
          setSelectedImage={setSelectedImage}
          isEditMode={modalInfo.typeOfModal === ADMIN_SUBJECTS_MODAL.EDIT}
        />
      </Modal>

      <Notification isVisible={isVisibleNotifcation} setIsVisible={setIsVisibleNotifcation} typeNotification={notification.typeNotification} message={notification.message} />

      <ModalConfirmDelete
        isOpen={isModalDeleteOpen}
        headerMessage="Eliminar Asignatura"
        bodyMessage="¿Esta seguro de querer eliminar la Asignatura?"
        data={subjectData}
        handleActions={handleActionsModalConfirmDelete}
      />

      <div>
        <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 place-content-between items-center py-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Gestión de Asignaturas
          </h1>
          <Button
            className="flex items-center justify-center gap-2"
            variant="primary"
            onClick={() => {
              addNewSubject();
            }}
          >
            <IoMdAdd className="text-sm h-6 w-6" />
            Nueva Asignatura
          </Button>
        </div>

        <div className={`${subjects.length != 0 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "" }`}>

          { subjects.length != 0 ? (
                subjects.map((subject, index) => (
                
                  <CardSubject<SubjectInterface>
                    key={index}
                    data={subject}
                    handleActions={handleActionsCardSubject}
                    name={formatTextWhithSpaces(subject.subjectName).toUpperCase()}
                  />
                
                ))
          ) : (
            <NotFoundData/>
          )
          }
            </div>
        
      </div>
    </>
  );
}
