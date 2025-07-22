import { FcMindMap, FcReading, FcSettings } from "react-icons/fc";
import {
  CheckBox,
  ErrorAuthMessage,
  Input,
  Select,
} from "../../../../../../common";

import "./animate.css";
import { ResourcesFileInput } from "./ResourcesFileInput";
import {
  RESOURCE_TYPE_BY_LEARNING_STYLE,
  SectionTransformInterface,
} from "../../../../../../shared";
import { RootState } from "../../../../../../store/store";
import { useSelector } from "react-redux";
import { DEFAULT } from "../../../../../auth/register/view/components/register.form.const";

interface Props {
  isCreatingResource: boolean;
  typeResource: string;
  setTypeResource: (e: string) => void;
  descriptionOfTheResource?: string;
  setDescriptionOfTheResource: (e: string) => void;
  setMultimediaFile: (file: File | null) => void;
  withDescription: boolean;
  setWithDescription: (e: boolean) => void;
  availablesSections: SectionTransformInterface[];
  sectionAsignated: number;
  setSectionAsignated: (e: number) => void;
}

export function ItemCreateOrUpdateResource({
  isCreatingResource,
  typeResource,
  setTypeResource,
  setMultimediaFile,
  descriptionOfTheResource,
  setDescriptionOfTheResource,
  withDescription,
  setWithDescription,
  availablesSections,
  sectionAsignated,
  setSectionAsignated,
}: Props) {
  const errorMessage = useSelector<RootState, string | null>(
    (store) => store.professor.errorMessageProfessorResource
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.value !== DEFAULT && parseInt(e.target.value) !== -1) {
      setSectionAsignated(parseInt(e.target.value));
    }
  };

  return (
    <>
      <div className="flex flex-col w-full bg-gray-300/50 rounded-sm pb-8">
        <div className="flex w-full break-words sm:w-[70%] m-auto h-12 items-center place-content-center">
          {errorMessage && <ErrorAuthMessage>{errorMessage}</ErrorAuthMessage>}
        </div>
        <div className="flex flex-col w-4/5 m-auto gap-y-4 pb-4 rounded-md">
          {isCreatingResource && (
            <>
              <div className="flex gap-y-4 flex-col border rounded-xl">
                <ResourcesFileInput setMultimediaFile={setMultimediaFile} />
              </div>
              <Select
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              >
                <option value={DEFAULT}>Asignar a Sección</option>
                {availablesSections.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </>
          )}

          <div className="flex m-auto gap-x-2">
            <p> Añadir Descripción </p>
            <CheckBox
              isChecked={withDescription}
              setIsChecked={setWithDescription}
            />
          </div>

          <div
            className={`transition-all rounded-md duration-300 ease-in-out overflow-hidden ${
              withDescription ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <Input
              type="text"
              placeholder={"Descripción"}
              value={descriptionOfTheResource}
              onChange={(e) => {
                setDescriptionOfTheResource(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="w-full grid justify-center  gap-4 sm:grid-cols-2 md:grid-cols-3 px-1 sm:px-20">
          <div
            className={` ${
              typeResource == RESOURCE_TYPE_BY_LEARNING_STYLE.REFLEXIVE
                ? "bg-gray-500 border-transparent"
                : "border"
            } w-[70vw] h-20 sm:w-auto sm:h-auto col-span-1 overflow-hidden rounded-lg p-1`}
            onClick={() => {
              setTypeResource(RESOURCE_TYPE_BY_LEARNING_STYLE.REFLEXIVE);
            }}
          >
            <div
              className={`border flex flex-col h-full w-full items-center bg-white justify-around rounded-md gap-y-4 sm:p-4`}
            >
              <FcMindMap
                className={`${
                  typeResource == RESOURCE_TYPE_BY_LEARNING_STYLE.REFLEXIVE
                    ? "animate-grow-shrink"
                    : ""
                } w-8 h-8 sm:w-16 sm:h-16`}
              />
              <div className="">
                <h3 className="font-bold">Reflexivo</h3>
              </div>
            </div>
          </div>

          <div
            className={` ${
              typeResource == RESOURCE_TYPE_BY_LEARNING_STYLE.THEORICAL
                ? "bg-gray-500 border-transparent"
                : "border"
            } w-[70vw] h-20 sm:w-auto sm:h-auto col-span-1 overflow-hidden rounded-lg p-1`}
            onClick={() => {
              setTypeResource(RESOURCE_TYPE_BY_LEARNING_STYLE.THEORICAL);
            }}
          >
            <div
              className={`border flex flex-col h-full w-full items-center bg-white justify-around rounded-md gap-y-4 sm:p-4`}
            >
              <FcReading
                className={`${
                  typeResource == RESOURCE_TYPE_BY_LEARNING_STYLE.THEORICAL
                    ? "animate-grow-shrink"
                    : ""
                } w-8 h-8 sm:w-16 sm:h-16`}
              />
              <div className="">
                <h3 className="font-bold">Teórico</h3>
              </div>
            </div>
          </div>
          <div
            className={` ${
              typeResource == RESOURCE_TYPE_BY_LEARNING_STYLE.PRAGMATIC
                ? "bg-gray-500 border-transparent"
                : "border"
            } w-[70vw] h-20 sm:w-auto sm:h-auto col-span-1 overflow-hidden rounded-lg p-1`}
            onClick={() => {
              setTypeResource(RESOURCE_TYPE_BY_LEARNING_STYLE.PRAGMATIC);
            }}
          >
            <div
              className={`border flex flex-col h-full w-full items-center bg-white justify-around rounded-md gap-y-4 sm:p-4`}
            >
              <FcSettings
                className={`${
                  typeResource == RESOURCE_TYPE_BY_LEARNING_STYLE.PRAGMATIC
                    ? "animate-grow-shrink"
                    : ""
                } w-8 h-8 sm:w-16 sm:h-16`}
              />
              <div className="">
                <h3 className="font-bold">Pragmático</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
