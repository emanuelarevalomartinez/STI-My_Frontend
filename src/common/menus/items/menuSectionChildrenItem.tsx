import { FaGraduationCap } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setShowMenuBar } from "../../../store/slices";
import { useNavigate } from "react-router";

interface Props{
    url:string;
    children: React.ReactNode;
}


export function MenuSectionChildrenItem({children, url}:Props){

  const navigate = useNavigate();
  const dispatchMenu = useDispatch<AppDispatch>();
  const desktopView = useSelector<RootState, boolean>(
    (store) => store.general.isDeskTopView
  );

    return(
        <>
          <div className="flex items-center gap-x-2 cursor-pointer px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-700 hover:text-white"
          onClick={ ()=> { 
            navigate(url);
            dispatchMenu(setShowMenuBar(desktopView));
           } }
          >
          <FaGraduationCap />
            {children}
          </div>
        </>
    )
}