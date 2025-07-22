import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FcApproval, FcClock, FcContacts } from "react-icons/fc";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../../../routes";
import { setAuthView } from "../../../login";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store/store";
import { getUserNameLocalStorage } from "../../../../../store/browser";

export function RegisterInfoView() {

    const navigate = useNavigate();
    const dispatchAuth = useDispatch<AppDispatch>();

      const [userName] = useState( ()=> {
        const newName = getUserNameLocalStorage();
        return newName || "";
      } );

    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <FcApproval className="h-12 w-12 text-green-600"/>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            ¡Registro Exitoso!
          </h2>
          
          <div className="space-y-4 text-gray-600">
            <div className="flex items-start">
              <FcContacts className="w-6 h-6 mt-1 mr-2" />
              <p className="text-lg">
                Su nombre de usuario es: <span className="font-semibold text-gray-800">{ userName }</span>
              </p>
            </div>
            
            <div className="flex items-start">
              <FcClock className="w-6 h-6 mt-1 mr-2" />
              <p className="text-lg">
                Espere a que el administrador apruebe su solicitud para poder acceder al sistema
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-700">
              Podra autenticarse cuando su cuenta sea activada
            </p>
             <button className="cursor-pointer mt-4"
             onClick={ ()=> { 
                navigate(APP_ROUTES.HOME); 
                dispatchAuth(setAuthView("login"));
             } }
             > <FaHome className="w-8 h-8"/> </button>
          </div>
        </div>
      </div>
    )
  }