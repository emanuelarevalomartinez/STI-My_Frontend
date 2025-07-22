import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { LoginModel } from "../model/login.service";
import { setErrorMessageLogin } from "../model";
import { setAuthToken } from "../../../../api/axiosConfig";
import { ROLES } from "../../register/view/components/register.form.const";
import { ADMIN_ROUTES, PROFESSOR_ROUTES, STUDENT_ROUTES } from "../../../../routes";
import { useNavigate } from "react-router";
import { LoginRequestInterface } from "../../../../shared/interfaces";
import { normalRegexPassword } from "../../../../shared/constants";
import { setRoleLocalStorage, setStudentFirstTimeOnSystemLocalStorage, setUserLocalStore, setUserNameLocalStorage } from "../../../../store/browser";


interface UserLoginInterface {
  validateLoginFields: (data: LoginRequestInterface) => boolean;
  sendLoginData: (data: LoginRequestInterface) => void;
};


export const useLoginController = (): UserLoginInterface => {
  const dispatchLogin = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const validateLoginFields = (data: LoginRequestInterface): boolean => {

    const { username, password } = data;

    if (!(username.length >= 3 && username.length > 0)) {
      dispatchLogin(setErrorMessageLogin("Nombre debe tener al menos 3 caracteres"));
      return false;
    }
    if (!(normalRegexPassword.test(password) && password.length > 0)) {
      dispatchLogin(setErrorMessageLogin("Contraseña no cumple con los requisitos"));
      return false;
    }
    if (!(username.length >= 3 && username.length > 0) && !(normalRegexPassword.test(password) && password.length > 0)) {
      dispatchLogin(setErrorMessageLogin("Ambos campos incumplen requisitos"));
      return false;
    }

    dispatchLogin(setErrorMessageLogin(null));
    return true;
    };


    const sendLoginData = async (data: LoginRequestInterface)=> {

      const loginResponse = await LoginModel.loginUser(data);

      if (loginResponse.success) {
        setUserNameLocalStorage(loginResponse.data.username);
        setAuthToken(loginResponse.data.token);
        setStudentFirstTimeOnSystemLocalStorage(loginResponse.data.firtsTime);
        setUserLocalStore(loginResponse.data.id);
        asignateLocalStoreRole(loginResponse.data.role);
        navigate(addressToNavigate(loginResponse.data.role));

      } else {
        dispatchLogin(setErrorMessageLogin(loginResponse.error));
      }
    }

    const asignateLocalStoreRole = (role: string) => {
      if(role == ROLES.ADMIN){
        setRoleLocalStorage("Administrador");
      } else if(role == ROLES.PRINCIPAL_PROFESSOR || role == ROLES.AUXILIAR_PROFESSOR){
        setRoleLocalStorage("Profesor");
      } else{
        setRoleLocalStorage("Estudiante");
      }
    }

    const addressToNavigate = (role: string) => {
      if(role == ROLES.ADMIN){
        return ADMIN_ROUTES.HOME;
      } else if(role == ROLES.PRINCIPAL_PROFESSOR || role == ROLES.AUXILIAR_PROFESSOR){
          return PROFESSOR_ROUTES.HOME;
      } else{
          return STUDENT_ROUTES.HOME;
      }
    }


    return {
      validateLoginFields,
      sendLoginData,
    }

}