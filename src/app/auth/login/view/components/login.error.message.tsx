import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { ErrorAuthMessage } from "../../../../../common";

export function LoginErrorMessage() {
  const errorMessage = useSelector<RootState, string | null>( (store)=> store.login.errorMessageLogin );

  return (
    <>
      <div className="flex h-12 items-center w-full break-words sm:w-4/6 m-auto">
        {errorMessage && <ErrorAuthMessage>{errorMessage}</ErrorAuthMessage>}
      </div>
    </>
  );
}
