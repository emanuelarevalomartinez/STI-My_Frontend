import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { ErrorAuthMessage } from "../../../../../../common";

export function AdminSubjectErrorMessage() {
  const errorMessage = useSelector<RootState, string | null>( (store)=> store.admin.setErrorMessageAdminSubject );

  return (
    <>
      <div className="flex h-12 items-center w-full break-words m-auto">
        {errorMessage && <ErrorAuthMessage>{errorMessage}</ErrorAuthMessage>}
      </div>
    </>
  );
}
