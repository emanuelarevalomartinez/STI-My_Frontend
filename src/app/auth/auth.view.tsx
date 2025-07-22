import { Outlet, useNavigate } from "react-router";
import { APP_ROUTES } from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setAuthView } from "./login";
import { DashBoard } from "../../common";
import { AUTH_INFO, AUTH_LOGIN, AUTH_REGISTER } from "./components";


export function Auth() {
  const navigate = useNavigate();

  const loginView = useSelector<RootState, string>( (store)=> store.login.authView );
  const dispatchAuth = useDispatch<AppDispatch>();

  const handleChangeAccessView = () => {
    if(loginView == AUTH_LOGIN){
      dispatchAuth(setAuthView("register"));
      navigate(APP_ROUTES.REGISTER); 
    } else if(loginView == AUTH_REGISTER){
      dispatchAuth(setAuthView("login"));
      navigate(APP_ROUTES.LOGIN);
    }
  };


  return (
    <>
      <DashBoard>
      <p className="text-[#E7A312] font-extrabold">STI</p>
        <button className="cursor-pointer" onClick={ ()=> { handleChangeAccessView() }}>
          { loginView == AUTH_LOGIN && "REGISTRARSE" }
          { loginView == AUTH_REGISTER && "ACCEDER" }
          { loginView == AUTH_INFO && "" }
        </button>
      </DashBoard>

      <div className="relative flex bg-[url('/images/home_wallpaper.png')] mt-16 min-h-[95vh] bg-no-repeat bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="flex z-10 items-center justify-center w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
