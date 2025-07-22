import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../routes";
import { DEFAULT, INITIAL, ROLES } from "../view/components/register.form.const";
import { RegisterModel, setErrorMessageRegister } from "../model";
import { setAuthView } from "../../login";
import { RegisterProfessorRequestInterface, RegisterStudentRequestInterface, RegisterVerifyData, SubjectResponseInterface, SubjectTransformInterface } from "../../../../shared/interfaces";
import { extremRegexEmail, normalRegexPassword } from "../../../../shared";
import { setUserNameLocalStorage } from "../../../../store/browser";
import { AUTH_INFO } from "../../components";

interface UseRegisterInterface {
  validateRegisterFields: (data: RegisterVerifyData) => boolean;
  defineTypeOfUser: (data: RegisterVerifyData)=> RegisterStudentRequestInterface | RegisterProfessorRequestInterface;
  registerUser: (data: RegisterProfessorRequestInterface | RegisterStudentRequestInterface) => void;
  getAvailablesSubjectsForProfessors: ()=> Promise<SubjectTransformInterface[]>;
}

export const useRegisterController = (): UseRegisterInterface => {

  const dispatchRegister = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const validateRegisterFields = (data: RegisterVerifyData): boolean => {
    const { name, firstName, lastName, email, password, confirmPassword, role, facultad, subject, group, academicYear, curseType } =
      data;
  
    if (!(name.length >= 3 && name.length > 0)) {
      dispatchRegister(setErrorMessageRegister("Nombre debe tener al menos 3 caracteres"));
      return false;
    }
    if (!(firstName.length >= 3 && firstName.length > 0)) {
      dispatchRegister(setErrorMessageRegister("Primer Apellido debe tener al menos 3 caracteres"));
      return false;
    }
    if (!(lastName.length >= 3 && lastName.length > 0)) {
      dispatchRegister(setErrorMessageRegister("Último Apellido debe tener al menos 3 caracteres"));
      return false;
    }
    if (!(extremRegexEmail.test(email) && email.length > 0)) {
      dispatchRegister(setErrorMessageRegister("Email no cumple con los requisitos"));
      return false;
    }
    if (!(normalRegexPassword.test(password) && password.length > 0)) {
      dispatchRegister(setErrorMessageRegister("Contraseña no cumple con los requisitos"));
      return false;
    }
    if (!(confirmPassword === password && confirmPassword.length > 0)) {
      dispatchRegister(setErrorMessageRegister("Contraseña y confirmación distintas"));
      return false;
    }
    if (!(facultad !== DEFAULT && facultad.length > 0)) {
      dispatchRegister(setErrorMessageRegister("Seleccione una Facultad"));
      return false;
    }
    if (!(role !== DEFAULT && role.length > 0)) {
      dispatchRegister(setErrorMessageRegister("Seleccione un Rol"));
      return false;
    }

    if (role === ROLES.PRINCIPAL_PROFESSOR || role === ROLES.AUXILIAR_PROFESSOR) {
      if (!(subject !== DEFAULT && subject.length > 0)) {
        dispatchRegister(setErrorMessageRegister("Seleccione una Asignatura"));
        return false;
      }
    } else if (role === ROLES.STUDENT) {
      if (!(academicYear !== INITIAL.ACADEMIC_YEAR)) {
        dispatchRegister(setErrorMessageRegister("Seleccione un año academico"));
        return false;
      }
      if (!(curseType !== DEFAULT && curseType.length > 0)) {
        dispatchRegister(setErrorMessageRegister("Seleccione un tipo de curso"));
        return false;
      }
      if (!(group !== DEFAULT && group.length > 0)) {
        dispatchRegister(setErrorMessageRegister("Seleccione un grupo docente"));
        return false;
      }
      if ((group !== DEFAULT && group.length > 0 && group.length < 4)) {
        dispatchRegister(setErrorMessageRegister("Grupo necesita 4 caractéres"));
        return false;
      }
    }
    dispatchRegister(setErrorMessageRegister(null));
    return true;
  };

  const defineTypeOfUser = (user: RegisterVerifyData): RegisterStudentRequestInterface | RegisterProfessorRequestInterface => {
    if (
      user.role === ROLES.PRINCIPAL_PROFESSOR ||
      user.role === ROLES.AUXILIAR_PROFESSOR
    ) {
      const data: RegisterProfessorRequestInterface = {
        fullname: `${user.name.trim()} ${user.firstName.trim()} ${user.lastName.trim()}`,
        email: user.email,
        password: user.password,
        role: user.role,
        facultad: user.facultad,
        subject: user.subject,
      };
      return data;
    } else {
      const data: RegisterStudentRequestInterface = {
        fullname: `${user.name.trim()} ${user.firstName.trim()} ${user.lastName.trim()}`,
        email: user.email,
        password: user.password,
        role: user.role,
        facultad: user.facultad,
        academicYear: user.academicYear,
        group: user.group,
        curseType: user.curseType,
      };
      return data;
    }
  }

  const getAvailablesSubjectsForProfessors = async (): Promise<SubjectTransformInterface[]> => {
    
      const response = await RegisterModel.getAllCurrentsSubjects();
      
      const getAllSubjectsResponse: SubjectResponseInterface[] = response.data.data;
      let subjectsToSee: SubjectTransformInterface[] = [];

      for (let index = 0; index < getAllSubjectsResponse.length; index++) {
        subjectsToSee.push({
          value: getAllSubjectsResponse[index].id.toString(),
          label: getAllSubjectsResponse[index].subjectName,
        });
        
      }
      return subjectsToSee;
  }

  const registerUser = async (data: RegisterProfessorRequestInterface | RegisterStudentRequestInterface) => {

      const registerResponse = await RegisterModel.registerUser(data);
      
      if (registerResponse.success) {
         dispatchRegister(setErrorMessageRegister(null));
         setUserNameLocalStorage(registerResponse.data.username);
         navigate(addressToNavigate());

      } else {
         dispatchRegister(setErrorMessageRegister(registerResponse.error));
      }
  };

  const addressToNavigate = () => {
    dispatchRegister(setAuthView(AUTH_INFO));
    return APP_ROUTES.INFO_VIEW;
  }

  return {
    validateRegisterFields,
    defineTypeOfUser,
    registerUser,
    getAvailablesSubjectsForProfessors,
  };
};
