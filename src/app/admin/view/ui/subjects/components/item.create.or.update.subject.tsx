import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../../../../../../common";
import { formatTextWhithSpaces } from "../../../../../../shared";
import { AdminSubjectErrorMessage } from "./subject.error.message";

interface Props {
  subjectName: string;
  setNewSubjectName: (e: string) => void;
  setSelectedImage: (file: File | null) => void;
  currentImage?: string | null;
  isEditMode?: boolean;
}

export function ItemNewSubject({
  subjectName,
  setNewSubjectName,
  setSelectedImage,
  currentImage,
  isEditMode = false,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode) {
      setPreview(currentImage || null);
    } else {
      setPreview(null);
    }
  }, [currentImage, isEditMode]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreview(null);
  };

  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="flex h-12 items-center w-full break-words m-auto">
          <AdminSubjectErrorMessage/>
        </div>
      <div className="flex flex-col">
        <label className="mb-2">Nombre de la asignatura</label>
        <Input
          type="text"
          value={formatTextWhithSpaces(subjectName).toUpperCase()}
          placeholder="Introduzca el nombre de la asignatura"
          onChange={(e) => setNewSubjectName(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2">Imagen asociada</label>

        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Vista previa"
              className="h-40 w-full object-cover rounded-md"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {isEditMode && preview === currentImage
                  ? "Imagen actual"
                  : "Nueva imagen seleccionada"}
              </span>
              <button
                type="button"
                onClick={removeImage}
                className="text-sm text-red-600"
              >
                {isEditMode && preview === currentImage
                  ? "Mantener sin imagen"
                  : "Cancelar"}
              </button>
            </div>
          </div>
        )}

        <div className="relative border-2 border-dashed border-gray-300 rounded-md px-6 py-4 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="pointer-events-none">
            {preview ? (
              <span>Cambiar imagen</span>
            ) : (
              <span>Añada una imagen</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
