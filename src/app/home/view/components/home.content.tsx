import { IoExitOutline, IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { AppDispatch, RootState } from "../../../../store/store";
import { setShowMenuBar } from "../../../../store/slices";
import { DashBoard, Loading, Modal, ModalConfirm, Notification } from "../../../../common";
import { getUserNameLocalStorage } from "../../../../store/browser";
import { ItemUpdatePassword } from "./intem.update.password";
import { useUserHomeController } from "../../controller";

export function HomeContent() {
  const dispatchMenu = useDispatch<AppDispatch>();
  const viewMenuBar = useSelector<RootState, boolean>(
    (store) => store.general.viewMenuBar
  );

  const {
    isOpenUpdatePasswordModal,
    setIsOpenUpdatePasswordModal,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    isOpenExitModal,
    setisOpenExitModal,
    handleActionsUpdatePasswordModal,
    handleActionsExitModal,
    notification,
    isVisibleNotifcation,
    setIsVisibleNotifcation,
    isLoading,
  } = useUserHomeController();

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
        isOpen={isOpenUpdatePasswordModal}
        headerMessage="Actualizar Contraseña"
        data={null}
        handleActions={handleActionsUpdatePasswordModal}
      >
        <ItemUpdatePassword
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmNewPassword={confirmNewPassword}
          setConfirmNewPassword={setConfirmNewPassword}
        />
      </Modal>

      <ModalConfirm
        isOpen={isOpenExitModal}
        headerMessage="Salir"
        bodyMessage="¿Esta seguro que quiere salir?"
        data={null}
        handleActions={handleActionsExitModal}
      />

      <div>
        <DashBoard>
          <div className="flex items-center gap-x-8">
            <IoMenu
              onClick={() => {
                dispatchMenu(setShowMenuBar(!viewMenuBar));
              }}
              className="w-6 h-6 cursor-pointer"
            />
            <p className="text-[#E7A312] font-extrabold">STI</p>
          </div>
          <div className="flex items-center gap-x-4">
            <p
              className="cursor-pointer"
              onClick={() => {
                setIsOpenUpdatePasswordModal(true);
              }}
            >
              {getUserNameLocalStorage()}
            </p>
            <button
              className="cursor-pointer"
              onClick={() => {
                setisOpenExitModal(true);
              }}
            >
              <IoExitOutline className="h-6 w-6" />
            </button>
          </div>
        </DashBoard>

        <div className="mt-16">
          <Outlet />
        </div>
      </div>
    </>
  );
}
