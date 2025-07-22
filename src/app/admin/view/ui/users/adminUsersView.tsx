import { useEffect } from "react";
import {
  Loading,
  Modal,
  ModalConfirmDelete,
  NotFoundData,
  Notification,
  Pagination,
  Search,
  Select,
  Table,
} from "../../../../../common";
import { useAdminUsersController } from "../../../controller";
import { UserInterface } from "../../../../../shared/interfaces";
import {
  ADMIN_USER_MODAL_TIPE,
  USERS_COLUMNS_MAPPING,
} from "../../../../../shared";
import { ItemLearnigStyle } from "./components/itemLearnigStyle";
import { ItemUpdateUser } from "./components/itemUpdateUser";

export function AdminUsersView() {

  const {
    users,
    user,
    headerMessage,
    fetchUsers,
    pagination,
    previewPage,
    nextPage,
    userFullName,
    userEmail,
    userFacultad,
    setUserFullName,
    setUserEmail,
    setUserFacultad,
    searchTerm,
    setSearchTerm,
    search,
    updateView,
    handleRoleChange,
    isLoading,
    handleActionsModal,
    HandleActionsUserTable,
    handleActionsUserDeleteModal,
    isModalOpen,
    isModalDeleteOpen,
    notification,
    isVisibleNotifcation,
    setIsVisibleNotifcation,
    chartData,
    initialData,
    fetchStudentLearningStyle,
  } = useAdminUsersController();

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, updateView, searchTerm]);

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
        weight={headerMessage === ADMIN_USER_MODAL_TIPE.EDIT ? 5 : 4}
        isOpen={isModalOpen}
        headerMessage={headerMessage}
        data={user}
        handleActions={handleActionsModal}
      >
        {headerMessage == ADMIN_USER_MODAL_TIPE.EDIT && (
          <ItemUpdateUser
            userFullName={userFullName}
            setUserFullName={setUserFullName}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userFacultad={userFacultad}
            setUserFacultad={setUserFacultad}
          />
        )}
        {headerMessage == ADMIN_USER_MODAL_TIPE.CHART && (
          <ItemLearnigStyle
            data={chartData}
            initialData={initialData}
            fetchStudentLearningStyle={fetchStudentLearningStyle}
          />
        )}
      </Modal>

      <ModalConfirmDelete
        isOpen={isModalDeleteOpen}
        headerMessage="Eliminar Usuario"
        bodyMessage="¿Esta seguro de querer eliminar el usuario?"
        data={user}
        handleActions={handleActionsUserDeleteModal}
      />

      <div>
        <div className="flex flex-col sm:flex-row w-full space-x-2 gap-y-2 mb-2">
          <div className="flex w-full sm:w-9/12">
            <Search search={search} setSearchTerm={setSearchTerm} />
          </div>

          <div className="flex w-5/6 m-auto sm:w-3/12">
            <Select
              onChange={(e) => {
                handleRoleChange(e.target.value);
              }}
            >
              <option value="default"> Filtrar </option>
              <option value="estudiante"> Estudiante </option>
              <option value="professor_principal"> Profesor Principal </option>
              <option value="professor_auxiliar"> Profesor Auxiliar </option>
              <option value="admin"> Administrador </option>
            </Select>
          </div>
        </div>

        {users.length != 0 ? (
          <>
            <div>
              <Table<UserInterface>
                columns={USERS_COLUMNS_MAPPING}
                data={users}
                handleActions={HandleActionsUserTable}
              />
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
    </>
  );
}
