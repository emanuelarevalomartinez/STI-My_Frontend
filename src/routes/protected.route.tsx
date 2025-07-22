import { Navigate, Outlet } from "react-router";
import { getAuthTokenLocalStore } from "../store/browser";


export const ProtectedRoute = () => {
  const token = getAuthTokenLocalStore();
  
  
  if (!token) {
    
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};