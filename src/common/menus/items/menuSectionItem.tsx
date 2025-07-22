import { HTMLAttributes } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setShowMenuBar } from "../../../store/slices";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isRouteSelected?: boolean;
  url:string;
}

export function MenuSectionItem({ children, url, isRouteSelected, ...props }: Props) {

const navigate = useNavigate();
const dispatchMenu = useDispatch<AppDispatch>();
  const desktopView = useSelector<RootState, boolean>(
    (store) => store.general.isDeskTopView
  );

  return (
    <>
      <div className={`${isRouteSelected ? "bg-gray-700 text-white" : "text-gray-700 hover:bg-gray-700 hover:text-white"} p-2 flex font-medium items-center gap-x-2 cursor-pointer text-base rounded-md`}
      onClick={ ()=> { 
        navigate(url); 
        dispatchMenu(setShowMenuBar(desktopView));
      } }
      {...props}
      >
        {children}
      </div>
    </>
  );
}
