import { deleteAuthPageLocalStorage, deleteAuthTokenLocalStorage, deleteRoleLocalStorage, deleteStudentFirstTimeOnSystemLocalStorage, deleteUserLocalStorage, deleteUserNameLocalStorage } from "../../store/browser";


export const formatTextWhithSpaces = (subject: string): string => {
    let formatted = subject.replace(/_/g, ' ');
    formatted = formatted.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    return formatted;
  };


  export const formatTextWithUnderscores = (subject: string): string => {
    let formatted = subject.replace(/\s+/g, '_').toLowerCase();
    return formatted;
};

export  const deleteAllBrowserData = () => {
          deleteStudentFirstTimeOnSystemLocalStorage();
          deleteAuthTokenLocalStorage();
          deleteAuthPageLocalStorage();
          deleteUserNameLocalStorage();
          deleteUserLocalStorage();
          deleteRoleLocalStorage();
       }