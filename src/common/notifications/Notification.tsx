  import { useEffect, useState } from "react";
  import { FcHighPriority, FcInfo, FcMediumPriority, FcOk } from "react-icons/fc";
  import { IoClose } from "react-icons/io5";
  import { NotificationInterface, NotificationType, SOUNDS } from "../../shared";
  
  export function Notification({ isVisible: propIsVisible, setIsVisible, typeNotification, message, duration = 5000 }: NotificationInterface) {
    const [internHiddenNotification, setInternHiddenNotification] = useState(false);
    const [localIsVisible, setLocalIsVisible] = useState(false);
    const [audioSuccessful] = useState(new Audio(SOUNDS.SUCCESSFUL));
    const [audioInfo] = useState(new Audio(SOUNDS.WARNING));
    const [audioWarning] = useState(new Audio(SOUNDS.WARNING));
    const [audioError] = useState(new Audio(SOUNDS.ERROR));
  
    const choseIcon = () => {
      switch (typeNotification) {
        case "success":
          return <FcOk />;
        case "info":
          return <FcInfo />;
        case "warning":
          return <FcMediumPriority />;
        case "error":
          return <FcHighPriority />;
        default:
          return null;
      }
    };
  
    const notificationStyle = (type: NotificationType): string => {
      switch (type) {
        case "success":
          return "text-green-800 bg-green-200 border-green-400";
        case "info":
          return "text-blue-800 bg-blue-200 border-blue-400";
        case "warning":
          return "text-yellow-800 bg-yellow-200 border-yellow-400";
        case "error":
          return "text-red-800 bg-red-200 border-red-400";
        default:
          return "";
      }
    };
  
    const stopAllAudios = () => {
      audioSuccessful.pause();
      audioSuccessful.currentTime = 0;
      audioInfo.pause();
      audioInfo.currentTime = 0;
      audioWarning.pause();
      audioWarning.currentTime = 0;
      audioError.pause();
      audioError.currentTime = 0;
    };
  
    const playNotificationSound = (type: NotificationType) => {
      stopAllAudios();
      
      let audioToPlay;
      switch (type) {
        case "success":
          audioToPlay = audioSuccessful;
          break;
        case "info":
          audioToPlay = audioInfo;
          break;
        case "warning":
          audioToPlay = audioWarning;
          break;
        case "error":
          audioToPlay = audioError;
          break;
        default:
          return;
      }
  
      audioToPlay.play().catch(error => {
        console.error("Error al reproducir sonido:", error);
      });
    };
  
    const closeNotification = () => {
      stopAllAudios();
      setLocalIsVisible(false);
      setTimeout(() => {
        setIsVisible(false);
        setInternHiddenNotification(false);
      }, 500);
    };
  
    useEffect(() => {
      if (propIsVisible) {
        setInternHiddenNotification(true);
        
        const showTimer = setTimeout(() => {
          setLocalIsVisible(true);
          playNotificationSound(typeNotification);
        }, 100); 
  
        const autoCloseTimer = setTimeout(() => {
          closeNotification();
        }, duration + 100);
  
        return () => {
          clearTimeout(showTimer);
          clearTimeout(autoCloseTimer);
        };
      } else {
        setLocalIsVisible(false);
      }
    }, [propIsVisible, typeNotification, message]);
  
    return (
      <>
        <div className={`${internHiddenNotification ? "fixed bottom-8 right-4 z-50 w-5/6 sm:w-1/2" : "hidden"}`}>
          <div
            className={`rounded-lg border shadow-lg transform transition-all duration-500 ease-in-out ${
              localIsVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            } ${notificationStyle(typeNotification)}`}
          >
            <div className="flex p-4 gap-x-4 justify-between items-center font-medium">
              <div className="flex gap-x-4 items-center">
                <span>{choseIcon()}</span>
                <p className="text-sm sm:text-base">{message}</p>
              </div>
              <button
                onClick={closeNotification}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
                aria-label="Cerrar notificación"
              >
                <IoClose className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }