import { FaHome, FaUsers } from "react-icons/fa";
import { PROFESSOR_ROUTES } from "../../../routes";
import { MenuElement } from "../../../common";
import { IoIosAlbums } from "react-icons/io";
import { GrResources } from "react-icons/gr";


export const professorElements: MenuElement[] = [
    { title: "Pagina Principal", icon: <FaHome />, address: PROFESSOR_ROUTES.HOME },
    { title: "Secciones", icon: <IoIosAlbums />, address: PROFESSOR_ROUTES.SECTIONS },
    { title: "Grupos", icon:  <FaUsers />, address: PROFESSOR_ROUTES.GROUPS },
    { title: "Recursos", icon:  <GrResources />, address: PROFESSOR_ROUTES.RESOURCES },
  ];