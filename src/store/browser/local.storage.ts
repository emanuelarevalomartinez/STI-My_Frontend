import { AUTH_LOGIN } from "../../app/auth/components";


export enum LOCAL_STORAGE {
   AUTH_TOKEN = "authToken",
   USER_NAME = "userName",
   AUTH_PATH = "authPage",
   STUDENT_FIRST_TIME = "firtsTime",
   USER = "user",
   ROLE = "role",
   STUDENT_FIRST_TIME_ON_SOME_COURSE = "studentFirstTimeOnSomeCourse",
}

export const getAuthTokenLocalStore = () => {
   return localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN);
}

export const setAuthTokenLocalStore = (newToken: string) => {
    localStorage.setItem(LOCAL_STORAGE.AUTH_TOKEN, newToken);
}

export const deleteAuthTokenLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE.AUTH_TOKEN);
}
    
export const getUserNameLocalStorage = () => {
    return localStorage.getItem(LOCAL_STORAGE.USER_NAME);
}

export const deleteUserNameLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE.USER_NAME);
}

export const setUserNameLocalStorage = (username: string) => {
    localStorage.setItem(LOCAL_STORAGE.USER_NAME, username);
  }

export const getAuthPageLocalStorageOrLogin = () => {
    return localStorage.getItem(LOCAL_STORAGE.AUTH_PATH) || AUTH_LOGIN;
}

export const setAuthPageLocalStorage = (newPath: string) => {
    localStorage.setItem(LOCAL_STORAGE.AUTH_PATH, newPath);
}

export const deleteAuthPageLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE.AUTH_PATH);
}

export const getUserLocalStore = (): number => {
    const currentUser = localStorage.getItem(LOCAL_STORAGE.USER);
    if(currentUser){
      const parseCurrentUser: number = JSON.parse(currentUser);
      return parseCurrentUser;
    } else {
       return -1;
    }
 }
 
 export const setUserLocalStore = (user: string) => {
     localStorage.setItem(LOCAL_STORAGE.USER, user);
 }

 export const deleteUserLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE.USER);
}

 export const getRoleLocalStorage = () => {
    return localStorage.getItem(LOCAL_STORAGE.ROLE) || "";
}

export const setRoleLocalStorage = (newRole: string) => {
    localStorage.setItem(LOCAL_STORAGE.ROLE, newRole);
}

export const deleteRoleLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE.ROLE);
}

export const getStudentFirstTimeOnSomeCourse = (): boolean => {
    const currentStatus = localStorage.getItem(LOCAL_STORAGE.STUDENT_FIRST_TIME_ON_SOME_COURSE);
    if(currentStatus){
      const parseCurrentStatus: boolean = JSON.parse(currentStatus);
      return parseCurrentStatus;
    } else {
       return true;
    }
}

export const setStudentFirstTimeOnSomeCourse = (firstTimeOnSomeCourse: boolean) => {
    const newStatus = firstTimeOnSomeCourse ? "true" : "false";
    localStorage.setItem(LOCAL_STORAGE.STUDENT_FIRST_TIME_ON_SOME_COURSE, newStatus);
}

export const deleteStudentFirstTimeOnSomeCourse = () => {
    localStorage.removeItem(LOCAL_STORAGE.STUDENT_FIRST_TIME_ON_SOME_COURSE);
}

export const getStudentFirstTimeOnSystemLocalStorage = (): boolean => {
    const currentStatus = localStorage.getItem(LOCAL_STORAGE.STUDENT_FIRST_TIME);
      if(currentStatus){
        const parseCurrentStatus: boolean = JSON.parse(currentStatus);
        return parseCurrentStatus;
      } else {
         return true;
      }
      
}

export const setStudentFirstTimeOnSystemLocalStorage = (firstTime: boolean) => {
   const newStatus = firstTime ? "true" : "false";
   localStorage.setItem(LOCAL_STORAGE.STUDENT_FIRST_TIME, newStatus);
}

export const deleteStudentFirstTimeOnSystemLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE.STUDENT_FIRST_TIME);
}





