import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { Outlet } from "react-router";
import { Menu } from "../../../../../common";
import { adminElements } from "../../../model";


export function AdminContent(){

    const viewMenuBar = useSelector<RootState, boolean>(
        (store) => store.general.viewMenuBar
      );

    return(
        <div className="flex flex-row h-[92vh]">
        <Menu elements={adminElements} />
        <div
          className={`flex-1 overflow-y-auto p-4
          ${ viewMenuBar && window.innerWidth >= 640 ? "ml-80": "ml-0" }
          `}
        >
          <Outlet />
        </div>
      </div>
    )
}