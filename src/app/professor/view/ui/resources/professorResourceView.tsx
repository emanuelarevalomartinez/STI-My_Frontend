import { useEffect } from "react";
import {
  Button,
  CardResource,
  Loading,
  Modal,
  ModalConfirmDelete,
  NotFoundData,
  Notification,
  Pagination,
} from "../../../../../common";
import {
  PROFESSOR_RESOURCE_MODAL_TIPE,
  ResourceInterface,
} from "../../../../../shared";
import { ItemCreateOrUpdateResource } from "./components/itemCreateOrUpdateResource";
import { useProfessorResourcesController } from "../../../controller";
import { IoMdAdd } from "react-icons/io";

export function ProfessorResourceView() {
  const {
    resources,
    resource,
    isModalOpen,
    isModalDeleteOpen,
    headerMessage,
    handleActionsModal,
    createNewResource,
    handleActionsResourceModal,
    handleActionsResourceDeleteModal,
    isVisibleNotifcation,
    setIsVisibleNotifcation,
    updateView,
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
    setWithDescription,
    availablesSections,
    sectionAsignated,
    setSectionAsignated,
    notification,
    isLoading,
  } = useProfessorResourcesController();

  useEffect(() => {
    fetchResources();
  }, [pagination.page, updateView]);

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
        data={resource}
        weight={5}
        handleActions={handleActionsModal}
      >
        <ItemCreateOrUpdateResource
          isCreatingResource={
            headerMessage == PROFESSOR_RESOURCE_MODAL_TIPE.CREATE
          }
          typeResource={typeResource}
          setTypeResource={setTypeResource}
          withDescription={withDescription}
          setWithDescription={setWithDescription}
          descriptionOfTheResource={descriptionOfTheResource}
          setDescriptionOfTheResource={setDescriptionOfTheResource}
          setMultimediaFile={setMultimediaFile}
          availablesSections={availablesSections}
          sectionAsignated={sectionAsignated}
          setSectionAsignated={setSectionAsignated}
        />
      </Modal>

      <ModalConfirmDelete
        isOpen={isModalDeleteOpen}
        headerMessage="Eliminar Recurso"
        bodyMessage="¿Esta seguro de querer eliminar el recurso ?"
        data={resource}
        handleActions={handleActionsResourceDeleteModal}
      />

      <div>
        <div>
          <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 place-content-between items-center py-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Gestión de Recursos
            </h1>
            <Button
              className="flex items-center justify-center gap-2"
              variant="primary"
              onClick={() => {
                // createNewGroup();
                createNewResource();
              }}
            >
              <IoMdAdd className="text-sm h-6 w-6" />
              Nuevo Recurso
            </Button>
          </div>
        </div>

        <div>
          {resources.length != 0 ? (
            <>
              <div>
                {resources.map((resource, index) => (
                  <CardResource<ResourceInterface>
                    key={index}
                    type={resource.type}
                    description={resource.description}
                    handleActions={handleActionsResourceModal}
                    data={resource}
                  />
                ))}
              </div>
              <div>
                <Pagination
                  page={pagination.page}
                  limit={pagination.limit}
                  total={pagination.total}
                  totalPages={pagination.totalPages}
                  previewPage={previewPage}
                  nextPage={nextPage}
                />
              </div>
            </>
          ) : (
            <NotFoundData />
          )}
        </div>
      </div>
    </>
  );
}
