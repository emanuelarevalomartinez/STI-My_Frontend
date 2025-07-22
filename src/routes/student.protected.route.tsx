import { Navigate, Outlet } from "react-router";
import { getRoleLocalStorage } from "../store/browser";
import { APP_ROUTES } from "./app.routes";

interface Props {
    children: React.ReactNode;
}

export const StudentProtectedRoute = ({ children }: Props) => {
  const role = getRoleLocalStorage();
  
  
  if (role !== "Estudiante") {
    
    return <Navigate to={APP_ROUTES.NOT_AUTORIZED_PAGE} replace />;
  }

  return children ? children : <Outlet />;
};