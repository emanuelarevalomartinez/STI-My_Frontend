

export function ProgressBar(){
    return(
            <div className="w-full bg-gray-200 rounded-full h-6 justify-end">
               <div className="bg-blue-600 font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-auto md:h-6 place-content-center text-xl"
               
               style={{
                 width: "10%"
               }}> 0%</div>
             </div>
    )
}