import { IoMdAdd } from "react-icons/io";
import {
  Button,
  CardGroup,
  Loading,
  Modal,
  ModalConfirmDelete,
  NotFoundData,
  Notification,
} from "../../../../../common";
import { GroupInterface } from "../../../../../shared";
import { useEffect } from "react";
import { useProfessorGroupsController } from "../../../controller";
import { ItemCreateOrUpdateGroup } from "./components/item.createOrUpdate.group";

export function ProfessorGroupsView() {
  const {
    groups,
    group,
    headerMessage,
    isModalOpen,
    isModalDeleteOpen,
    createNewGroup,
    handleActionsModal,
    handleActionsGroupDeleteModal,
    handleActionsGroupModal,
    fetchGroups,
    updateView,
    name,
    setName,
    groupPassword,
    setGroupPassword,
    notification,
    isVisibleNotifcation,
    setIsVisibleNotifcation,
    isLoading,
  } = useProfessorGroupsController();

  useEffect(() => {
    fetchGroups();
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
        data={group}
        handleActions={handleActionsModal}
      >
        <ItemCreateOrUpdateGroup
          name={name}
          setName={setName}
          groupPassword={groupPassword}
          setGroupPassword={setGroupPassword}
        />
      </Modal>

      <ModalConfirmDelete
        isOpen={isModalDeleteOpen}
        headerMessage="Eliminar Grupo"
        bodyMessage="¿Esta seguro de querer eliminar el grupo ?"
        data={group}
        handleActions={handleActionsGroupDeleteModal}
      />
      <div>
        <div>
          <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 place-content-between items-center py-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Gestión de Grupos
            </h1>
            <Button
              className="flex items-center justify-center gap-2"
              variant="primary"
              onClick={() => {
                createNewGroup();
              }}
            >
              <IoMdAdd className="text-sm h-6 w-6" />
              Nuevo Grupo
            </Button>
          </div>
        </div>

        <div>
          {groups.length != 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {groups.map((group, index) => (
 <CardGroup<GroupInterface>
                  key={index}
                  groupName={group.name}
                  handleActions={handleActionsGroupModal}
                  bodyMessage=""
                  data={group}
                />
               
              ))}
            </div>
          ) : (
            <NotFoundData />
          )}
        </div>
      </div>
    </>
  );
}
