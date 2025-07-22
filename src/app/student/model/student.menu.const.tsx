
import { FaHome } from "react-icons/fa";
import { STUDENT_ROUTES } from "../../../routes";
import { MenuElement } from "../../../common";
import { PiBookBookmarkFill } from "react-icons/pi";
import { IoIosJournal } from "react-icons/io";


export const studentElements: MenuElement[] = [
    { title: "Pagina Principal", icon: <FaHome />, address: STUDENT_ROUTES.HOME },
    { title: "Asignaturas", icon: <IoIosJournal />, address: STUDENT_ROUTES.ENABLE_SUBJECTS },
 /*    { title: "Curso Actual", icon: <PiBookBookmarkFill />, address: STUDENT_ROUTES.CURRENT_SUBJECT }, */

  /*   {
      title: "Mis Cursos",
      icon: <FaGraduationCap />,
      address: "#",
      action: true,
      children: [
        { title: "Inteligencia Artificial", address: STUDENT_SUBJECT_ROUTES.IA },
        
      ],
    }, */
  ];