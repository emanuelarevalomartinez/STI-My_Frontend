import { FaHome, FaUsers } from "react-icons/fa";
import { ADMIN_ROUTES } from "../../../routes";
import { IoIosJournal } from "react-icons/io";
import { MenuElement } from "../../../common";


export const adminElements: MenuElement[] = [  
    { title: "Pagina Principal", icon: <FaHome />, address: ADMIN_ROUTES.HOME },
    { title: "Usuarios", icon: <FaUsers /> , address: ADMIN_ROUTES.USERS },
    { title: "Asignaturas", icon: <IoIosJournal /> , address: ADMIN_ROUTES.SIGNATURES },
  ];