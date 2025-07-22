import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { AppDispatch } from "../../../../../store/store";
import {
  formatTextWhithSpaces,
  SubjectInterface,
} from "../../../../../shared";
import { ChatView } from "../../../../chat";
import { Modal, Notification, ProgressBar } from "../../../../../common";
import { RiRobot2Line } from "react-icons/ri";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useEffect } from "react";
import { ItemInitWelcomeToCourse } from "./components/itemInitWelcomeToCourse";
import { setShowMenuBar } from "../../../../../store/slices";
import { useStudentCurrentSubjectController } from "../../../controller";
import { Accordion } from "../../../../../common/accordion";
import { ItemViewResourceOfCourse } from "./components/itemViewResourceOfCourse";
import { ItemTourOnCourse } from "./components/itemTourOnCourse";
import { getStudentFirstTimeOnSomeCourse } from "../../../../../store/browser";

export function StudentCurrentSubjectView() {

  const location = useLocation();
  const subjectStudentData = location.state?.subjectInfo as SubjectInterface;
  const navigate = useNavigate();


  const dispatchMenu = useDispatch<AppDispatch>();

  const {
    currentCourseResourcesForAccordeon,
    handleChangeVisibilityOfElementOnAccordeon,
    isOpenItemWelcomeToCourse,
    setIsOpenItemWelcomeToCourse,
    isOpenTourOnCourse,
    setIsOpenTourOnCourse,
    progresBarPosition,
    setProgresBarPosition,
    fetchALLCourseResources,
    handleActionsModal,
    isOpenChatModal,
    openResource,
    resourceUrl,
    openChat,
    isModalOpen,
    isOpenResource,
    headerMessage,
    isVisibleNotifcation,
    setIsVisibleNotifcation,
    notification,
  } = useStudentCurrentSubjectController();

  useEffect(() => {
    fetchALLCourseResources(subjectStudentData.id);
    dispatchMenu(setShowMenuBar(false));
    setTimeout(() => {
      setIsOpenItemWelcomeToCourse(false);
      setIsOpenTourOnCourse(true);
    }, 8000);
  }, []);

  return (
    <>
     <Notification
            isVisible={isVisibleNotifcation}
            setIsVisible={setIsVisibleNotifcation}
            typeNotification={notification.typeNotification}
            message={notification.message}
          />
      <Modal
        weight={5}
        isOpen={isModalOpen}
        headerMessage={headerMessage}
        data={""}
        withoutButtoms={headerMessage !== "OZI" ? undefined : true}
        handleActions={handleActionsModal}
      >
        <div className="flex flex-col w-full">
          {isOpenChatModal && <ChatView />}
          {isOpenResource && <ItemViewResourceOfCourse resourceUrl={resourceUrl} /> }
        </div>
      </Modal>

      {isOpenItemWelcomeToCourse && getStudentFirstTimeOnSomeCourse() && <ItemInitWelcomeToCourse />} 

     {isOpenTourOnCourse && getStudentFirstTimeOnSomeCourse() && <ItemTourOnCourse progresBarPosition={progresBarPosition} setProgresBarPosition={setProgresBarPosition} setIsOpenTourOnCourse={setIsOpenTourOnCourse}/>}

      <div>
        <div>
          <div className="grid grid-cols-1 gap-y-4 items-center pb-2">
            <div className="flex items-center justify-center w-full col-span-1 row-start-1">
              <ProgressBar />
            </div>
            <div className="flex w-full gap-x-2 col-span-1 row-start-2">
              <p
                onClick={() => {
                  navigate(-1);
                }}
              >
                <IoArrowBackCircleOutline className="w-8 h-8" />{" "}
              </p>

              <h1 className="flex w-full text-2xl font-bold text-gray-800 text-center justify-center">
                {formatTextWhithSpaces(subjectStudentData.subjectName)}
              </h1>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Accordion
            currentCourseResourcesForAccordeon={
              currentCourseResourcesForAccordeon
            }
            handleChangeVisibilityOfElementOnAccordeon={
              handleChangeVisibilityOfElementOnAccordeon
            }
            openResource={openResource}
          />
        </div>

        <div
          className="rounded-full place-content-center h-20 w-20 fixed right-4 bottom-4 bg-blue-500 cursor-pointer"
          onClick={() => {
            openChat();
          }}
        >
          <div className="flex items-center rounded-full h-full place-content-center">
            <RiRobot2Line className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>
    </>
  );
}
