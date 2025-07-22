import { useLocation, useNavigate } from "react-router";
import {
  formatTextWhithSpaces,
  GROUP_STUDENTS_COLUMNS_MAPPING,
  GroupInterface,
  GroupSpecificInfoToShowInterface,
} from "../../../../../../shared";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useProfessorGroupInfoController } from "../../../../controller";
import { useEffect } from "react";
import {
  Loading,
  NotFoundData,
  Notification,
  Table,
} from "../../../../../../common";

export function ItemProfessorSpecificGroupStudentsInfo() {
  const location = useLocation();
  const professorGroupDataInfo = location.state?.groupInfo as GroupInterface;
  const navigate = useNavigate();

  const {
    studentsOnGroup,
    fetchGroupInfo,
    notification,
    isVisibleNotifcation,
    setIsVisibleNotifcation,
    isLoading,
  } = useProfessorGroupInfoController();

  useEffect(() => {
    fetchGroupInfo(professorGroupDataInfo.id);
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

      <div>
        <div>
          <div className="grid grid-cols-1 gap-y-4 items-center pb-2">
            <div className="flex w-full gap-x-2 col-span-1 row-start-2">
              <p
                onClick={() => {
                  navigate(-1);
                }}
              >
                <IoArrowBackCircleOutline className="w-8 h-8" />
              </p>

              <h1 className="flex w-full text-2xl font-bold text-gray-800 text-center justify-center">
                Grupo: {formatTextWhithSpaces(professorGroupDataInfo.name)}
              </h1>
            </div>
          </div>
        </div>

        <div>
          {studentsOnGroup.length != 0 ? (
            <>
              <div>
                <Table<GroupSpecificInfoToShowInterface>
                  columns={GROUP_STUDENTS_COLUMNS_MAPPING}
                  data={studentsOnGroup}
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
