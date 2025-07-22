
interface Props{
    question:string;
    number: number;
    children: React.ReactNode;
}


export function QuestionContainer({question, number,children}:Props){
    return(
        <>
          <div className="flex flex-col md:flex-row m-2 p-2 md:p-4 bg-white rounded-lg gap-x-3 items-center place-content-between">
              <p className="w-full md:w-3/5">  <span className="text-blue-500"> {number+1} </span>  {question} </p>
              <div className="flex gap-2 mt-2">
                {children}
              </div>
            </div>
        </>
    )
}