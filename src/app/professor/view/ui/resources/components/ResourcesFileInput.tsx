    import { useState, useRef } from "react";
    import { RiCloseLargeFill } from "react-icons/ri";
    
    interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
      setMultimediaFile: (file: File | null) => void;
    }
    
    export function ResourcesFileInput({ setMultimediaFile }: Props) {

      const [fileName, setFileName] = useState<string | null>(null);
      const inputRef = useRef<HTMLInputElement>(null);
      const [previousValue, setPreviousValue] = useState('');
    
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
        if (file) {
          setFileName(file.name);
          setMultimediaFile(file);
          setPreviousValue(event.target.value);
        } else {
          if (inputRef.current) {
            inputRef.current.value = '';
          }
          setFileName(null);
          setMultimediaFile(null);
        }
      };
    
      const handleClick = () => {
        if (inputRef.current) {
          setPreviousValue(inputRef.current.value);
        }
      };
    
      const handleBlur = () => {
        if (inputRef.current && inputRef.current.value === '' && previousValue === '') {
          setFileName(null);
          setMultimediaFile(null);
        }
      };
    
      const handleRemoveFile = () => {
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        setMultimediaFile(null);
        setFileName(null);
        setPreviousValue('');
      };
    
      return (
        <div className="flex flex-col md:flex-row items-center gap-0 md:gap-2 w-full">
          <label className="w-full md:w-11/12 text-base md:text-sm file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60 cursor-pointer flex flex-col md:flex-row justify-between items-center rounded-md px-4 py-3 gap-x-1 border-transparent md:border">
            <span className="w-full mb-2 md:mb-0 md:w-5/12 justify-center bg-teal-500 text-white py-3 px-5 text-center rounded-md font-semibold text-sm md:text-base">
              Seleccionar archivo
            </span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              onClick={handleClick}
              onBlur={handleBlur}
              ref={inputRef}
              required
            />
            <span className="truncate w-full md:w-[80%] text-center text-sm md:text-base">
              {fileName || "Ningún archivo seleccionado"}
            </span>
          </label>
          {fileName && (
            <div className="my-2">
              <div 
                className="hidden md:flex justify-center bg-red-500 w-2/6 md:w-auto rounded-md md:rounded-full px-4 py-2 md:p-2 hover:text-white hover:bg-red-600"
                onClick={handleRemoveFile}
              >
                <RiCloseLargeFill />
              </div>
              <div>
                <button
                  className="flex md:hidden bg-red-500 justify-center text-white text-sm md:text-base px-4 py-2 rounded-md md:w-auto"
                  onClick={handleRemoveFile}
                >
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }