import { PaginationInterface } from "../../shared";
import { Button } from "../buttons";

interface Props extends PaginationInterface{
    previewPage: () => void;
    nextPage: () => void;
}


export function Pagination({ page, limit, total, totalPages, previewPage, nextPage}: Props) {
  return (
    <>
      <div>

        <div className="flex flex-row items-center justify-center mt-4 py-2 space-x-2">
          <Button 
            variant="other"
            disabled={page === 1}
            onClick={ () => { previewPage() } }
            > Anterior 
          </Button>
          <p className="hidden sm:flex text-gray-500 mx-2"> { page } de { totalPages } </p>
          <Button 
            variant="other"
            disabled={page >= totalPages}
            onClick={ ()=> { nextPage() } }
            > Siguiente 
          </Button>
        </div>

        <div className="flex sm:hidden flex-row items-center justify-center mt-2">
          <p className="flex text-gray-500 mx-2"> { page } de { totalPages } </p>
        </div>

      </div>
    </>
  );
}
