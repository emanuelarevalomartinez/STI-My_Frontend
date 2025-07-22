import { useSelector } from "react-redux";
import { CheckBox, ErrorAuthMessage, Input } from "../../../../../../common";
import { RootState } from "../../../../../../store/store";

interface Props {
  name: string;
  setName: (e: string) => void;
  numberSession: string;
  setNumberSession: (e: string) => void;
  description: string | undefined;
  setDescription: (e: string) => void;
  withDescription: boolean;
  setWithDescription: (e: boolean) => void;
}

export function ItemCreateOrUpdateSection({
  name,
  setName,
  numberSession,
  setNumberSession,
  description,
  withDescription,
  setDescription,
  setWithDescription,
}: Props) {
  const errorMessage = useSelector<RootState, string | null>(
    (store) => store.professor.errorMessageProfessorSection
  );

  return (
    <>
      <div className="flex flex-col w-full bg-gray-300/50 rounded-sm pb-8">
        <div className="flex w-full break-words sm:w-[90%] m-auto h-12 items-center place-content-center">
          {errorMessage && <ErrorAuthMessage>{errorMessage}</ErrorAuthMessage>}
        </div>
        <div className="flex flex-col w-4/5 m-auto gap-y-4 pb-4 rounded-md">
          <Input
            type="text"
            placeholder={"Nombre"}
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            required
          />
          <Input
            type="number"
            step="1"
            placeholder={"Numero"}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setNumberSession(value);
            }}
            value={numberSession}
            required
          />
          <div className="flex gap-x-2">
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
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            />
          </div>
        </div>
      </div>
    </>
  );
}
