import { useEffect, useState } from "react";
import { INIT_COURSE_IMAGE, SOUNDS } from "../../../../../../shared";


export function ItemInitWelcomeToCourse(){

const [activeSquares, setActiveSquares] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [closingDoorsSoundEfect] = useState(new Audio(SOUNDS.CLOSING_DOORS));
  const [initCourseSoundEfect] = useState(new Audio(SOUNDS.INIT_COURSE));

  const animationDelay = 1000;

  const [isWelcomeNotHidden, setIsWelcomeNotHidden] = useState(false);

  const [isDisappearing, setIsDisappearing] = useState(false);
  const animationDuration = 1000;
  const holdTime = 1000;

  useEffect(() => {
    const playSounds = async () => {
      try {
        await closingDoorsSoundEfect.play();
        setTimeout(() => {
          setIsWelcomeNotHidden(true);
          initCourseSoundEfect.play();
        }, 5200);
      } catch (error) {
        console.error("Error al reproducir sonido:", error);
      }
    };

    playSounds();
    const timers: number[] = [];

    let disappearingTimer: number;

    const startAppearingAnimation = () => {
      setActiveSquares([false, false, false, false]); 

      timers.push(
        setTimeout(() => {
          setActiveSquares((prev) => [true, prev[1], prev[2], prev[3]]);
        }, animationDelay * 0)
      );

      timers.push(
        setTimeout(() => {
          setActiveSquares((prev) => [prev[0], true, prev[2], prev[3]]);
        }, animationDelay * 1)
      );

      timers.push(
        setTimeout(() => {
          setActiveSquares((prev) => [prev[0], prev[1], true, prev[3]]);
        }, animationDelay * 2)
      );

      timers.push(
        setTimeout(() => {
          setActiveSquares((prev) => [prev[0], prev[1], prev[2], true]);
        }, animationDelay * 3)
      );

      
      const totalAppearTime = animationDelay * 3 + animationDuration; 
      disappearingTimer = setTimeout(() => {
        setIsDisappearing(true);
      }, totalAppearTime + holdTime);
    };

    startAppearingAnimation(); 
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      clearTimeout(disappearingTimer);
    };
  }, []);

  const baseSquareClasses =
    "absolute w-24 h-24 bg-white transition-all duration-1000 ease-in-out transform";

  const targetTransformTL = `translate-x-0 w-[50%] h-[50%] translate-y-0 opacity-100`;
  const targetTransformTR = `translate-x-0 w-[50%] h-[50%] translate-y-0 opacity-100`;
  const targetTransformBR = `translate-x-0 w-[50%] h-[50%] translate-y-0 opacity-100`;
  const targetTransformBL = `translate-x-0 w-[50%] h-[50%] translate-y-0 opacity-100`;

  const initialTransformTL = "-translate-x-full -translate-y-full opacity-0";
  const initialTransformTR = "translate-x-full -translate-y-full opacity-0";
  const initialTransformBR = "translate-x-full translate-y-full opacity-0";
  const initialTransformBL = "-translate-x-full translate-y-full opacity-0";

    return(
        <>
 <div
        className={`${
          isWelcomeNotHidden ? "bg-transparent" : "bg-gray-300"
        } fixed grid grid-cols-2 inset-0 items-center justify-center z-20 overflow-hidden`}
      >
        <div
          className={`${
            isWelcomeNotHidden ? "bg-transparent" : "bg-gray-300"
          } flex h-full w-full`}
        >
          <div
            className={`${baseSquareClasses} ${
              activeSquares[0] && !isDisappearing
                ? targetTransformTL
                : initialTransformTL
            }`}
          ></div>
        </div>
        <div
          className={`${
            isWelcomeNotHidden ? "bg-transparent" : "bg-gray-300"
          } flex h-full w-full`}
        >
          <div
            className={`${baseSquareClasses} top-0 right-0 ${
              activeSquares[1] && !isDisappearing
                ? targetTransformTR
                : initialTransformTR
            }`}
          ></div>
        </div>
        <div
          className={`${
            isWelcomeNotHidden ? "bg-transparent" : "bg-gray-300"
          } flex h-full w-full`}
        >
          <div
            className={`${baseSquareClasses} bottom-0 right-0 ${
              activeSquares[2] && !isDisappearing
                ? targetTransformBR
                : initialTransformBR
            }`}
          ></div>
        </div>
        <div
          className={`${
            isWelcomeNotHidden ? "bg-transparent" : "bg-gray-300"
          } flex h-full w-full`}
        >
          <div
            className={`${baseSquareClasses} bottom-0 left-0 ${
              activeSquares[3] && !isDisappearing
                ? targetTransformBL
                : initialTransformBL
            }`}
          ></div>
        </div>

        <div
          className={`${
            isWelcomeNotHidden
              ? "fixed inset-0 flex flex-col w-full text-center items-center justify-center"
              : "hidden"
          }`}
        >
          <img
            src={INIT_COURSE_IMAGE}
            alt="Huevo saltando"
            className="rounded-full h-40 w-40 sm:h-56 sm:w-56"
          />
          <p className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Bienvenido al curso
          </p>
        </div>
      </div>
        </>
    )
}