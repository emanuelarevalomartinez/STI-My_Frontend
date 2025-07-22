import { CiSearch } from "react-icons/ci";

interface Props{
  search: () => void;
  setSearchTerm: (e: string) => void;
}

export function Search({ search, setSearchTerm }: Props) {
  return (
    <>
      <div className="flex place-content-end w-full">
        <div className="relative w-full bg-white rounded-full">
          <input
            placeholder="Buscar"
            className="rounded-full w-full h-12 bg-transparent py-2 pl-8 pr-20 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-blue-200 focus:border-blue-200"
            type="text"
            onChange={ (e)=> { setSearchTerm(e.target.value);
             } }
          />
          <button
            type="submit"
            className="absolute inline-flex items-center h-8 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-2 bg-blue-600 sm:text-base sm:font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={ ()=> {  search();
             } }
          >
            <CiSearch />
          </button>
        </div>
      </div>
    </>
  );
}
