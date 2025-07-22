import { useDispatch, useSelector } from "react-redux";
import { useEffect, ReactNode } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { setIsDeskTopView, setShowMenuBar } from "../../store/slices";
import { MenuSectionItem } from "./items/menuSectionItem";
import { MenuSectionContentItem } from "./items/menuSectionContentItem";
import { getRoleLocalStorage } from "../../store/browser";
import { useLocation } from "react-router";

export interface MenuChildElement {
  title: string;
  address: string;
}

export interface MenuElement {
  title: string;
  icon: ReactNode;
  address: string;
  action?: boolean;
  children?: MenuChildElement[];
}

interface Props {
  elements: MenuElement[];
}

export function Menu({ elements }: Props) {

  const location = useLocation();

  const dispatchMenu = useDispatch<AppDispatch>();
  const viewMenuBar = useSelector<RootState, boolean>(
    (store) => store.general.viewMenuBar
  );

  const colorUserRole = (): string => {
    const role = getRoleLocalStorage();
    let color: string;

    if (role == "Administrador") {
      color = "text-red-500";
    } else if (
      role == "Profesor"
    ) {
      color = "text-blue-500";
    } else {
      color = "text-green-500";
    }
    return color;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        dispatchMenu(setIsDeskTopView(false));
        dispatchMenu(setShowMenuBar(false));
      } else {
        dispatchMenu(setShowMenuBar(true));
        dispatchMenu(setIsDeskTopView(true));
      }
    };
    colorUserRole();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatchMenu]);

  return (
    <>
      <div
        className={`fixed bg-white h-full block shadow-2xl min-w-80 z-20 px-3 overflow-x-hidden transition-transform transform ${
          viewMenuBar ? " translate-x-0" : "fixed -translate-x-full"
        } duration-500 ease-in-out`}
      >
        <div className="mt-2">
          <p className={`flex justify-center font-bold mt-4 mb-2 h-6 ${colorUserRole()}`}>
          {getRoleLocalStorage()}
          </p>
          <div className="flex flex-col space-y-2">
            {elements.map((element, index) => {
               const isCurrent = location.pathname === element.address;
                 return (
                  <div key={index}>
                    {!element.children ? (
                      <MenuSectionItem 
                      url={element.address}
                      isRouteSelected={isCurrent}
                      >
                        {element.icon}
                        <p>{element.title}</p>
                      </MenuSectionItem>
                    ) : (
                      <MenuSectionContentItem
                        title={element.title}
                        childs={element.children}
                      />
                    )}
                  </div>
                )
            } 
            )}
          </div>
        </div>
      </div>
    </>
  );
}
