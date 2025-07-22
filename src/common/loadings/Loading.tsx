import { LOADING_IMAGE } from "../../shared";



export function Loading() {
    return (
      <>
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700/50 z-20">
          <div className="animate-spin rounded-full h-36 w-36 border-t-4 border-b-4 border-blue-500"></div>
          <img
            src={LOADING_IMAGE}
            alt="Huevo Pensando"
            className="absolute rounded-full h-28 w-28"
          />
        </div>
      </>
    );
  }
  