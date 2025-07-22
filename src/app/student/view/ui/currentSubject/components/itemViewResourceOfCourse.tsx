
interface Props{
  resourceUrl: string;
}

export function ItemViewResourceOfCourse({resourceUrl}:Props){
    return(
        <>
          <div className="flex h-80 items-center justify-center">
            {/*  {resourceUrl} */}
            <div className="flex text-red-500 font-semibold text-2xl p-4 text-center">
              <p> Esta característica aún no a sido implementada </p>
            </div>
              </div>
        </>
    )
}