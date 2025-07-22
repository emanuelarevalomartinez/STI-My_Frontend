import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export function ModalOnlyContainer({ children }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-gray-600 bg-opacity-75 transition-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`fixed z-30 inset-0 flex items-center justify-center p-4 transition-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-5xl h-full sm:h-4/5 ${
            isOpen ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
          }`}
        >
          <div className="p-0 sm:p-6 overflow-y-auto bg-white h-full">
            <div className="p-2 h-full rounded-lg bg-gray-200">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
