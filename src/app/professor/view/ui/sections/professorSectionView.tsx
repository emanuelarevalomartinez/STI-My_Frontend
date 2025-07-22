import { useEffect } from "react";
import {
  Button,
  CardSection,
  Loading,
  Modal,
  ModalConfirmDelete,
  NotFoundData,
  Notification,
} from "../../../../../common";
import { useProfessorSectionController } from "../../../controller";
import {
  PROFESSOR_SECTION_MODAL_TIPE,
  SectionInterface,
} from "../../../../../shared";
import { IoMdAdd } from "react-icons/io";
import { ItemCreateOrUpdateSection } from "./components/item.createOrUpdate.section";
import { ItemAddResourcesToSection } from "./components/item.addResourcesToSection";

export function ProfessorSectionsView() {
  const {
    updateView,
    updateViewAsociateResourcesToASecction,
    isModalOpen,
    headerMessage,
    sections,
    handleActionsModal,
    handleActionsSectionModal,
    handleActionsSectionDeleteModal,
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
    createNewSection,
    notification,
    isVisibleNotifcation,
    setIsVisibleNotifcation,
    isLoading,
    isModalDeleteOpen,
    section,
  } = useProfessorSectionController();

  useEffect(() => {
    fetchSections();
  }, [updateView]);

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
        data={section}
        handleActions={handleActionsModal}
        weight={
          headerMessage === PROFESSOR_SECTION_MODAL_TIPE.ADD_RESOURCES ? 5 : 3
        }
      >
        {headerMessage === PROFESSOR_SECTION_MODAL_TIPE.ADD_RESOURCES ? (
          <ItemAddResourcesToSection
          existSomeResource={existSomeResource}
          updateViewAsociateResourcesToASecction={updateViewAsociateResourcesToASecction}
            resourcesToAsignateASection={resourcesToAsignateASection}
            addOrQuitResourceOnListToAsignASection={
              addOrQuitResourceOnListToAsignASection
            }
            paginationResourcesAsignatesToASection={paginationResourcesAsignatesToASection}
            previewPage={previewPage}
            nextPage={nextPage}
          />
        ) : (
          <ItemCreateOrUpdateSection
            name={name}
            setName={setName}
            numberSession={numberSession}
            setNumberSession={setNumberSession}
            description={description}
            setDescription={setDescription}
            withDescription={withDescription}
            setWithDescription={setWithDescription}
          />
        )}
      </Modal>

      <ModalConfirmDelete
        isOpen={isModalDeleteOpen}
        headerMessage="Eliminar Sección"
        bodyMessage="¿Esta seguro de querer eliminar la sección?"
        data={section}
        handleActions={handleActionsSectionDeleteModal}
      />

      <div>
        <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 place-content-between items-center py-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Gestión de Secciones
          </h1>
          <Button
            className="flex items-center justify-center gap-2"
            variant="primary"
            onClick={() => {
              createNewSection();
            }}
          >
            <IoMdAdd className="text-sm h-6 w-6" />
            Nueva Sección
          </Button>
        </div>
      </div>

      {sections.length != 0 ? (
        <div>
          {sections.map((section, index) => (
            <CardSection<SectionInterface>
              key={index}
              name={section.name}
              numberSession={section.numberSession}
              description={section.description}
              handleActions={handleActionsSectionModal}
              data={section}
            />
          ))}
        </div>
      ) : (
        <NotFoundData />
      )}
    </>
  );
}
