import { useEffect } from "react";
import { Chart, ChartDataInterface } from "../../../../../../common"

interface Props {
  data: ChartDataInterface[];
  initialData: ChartDataInterface[];
  fetchStudentLearningStyle: ()=> Promise<void>;
}


export function ItemLearnigStyle({ data, initialData, fetchStudentLearningStyle}:Props){


    useEffect(() => {
      fetchStudentLearningStyle();
    }, []); 
    

    return(
        <>
        <div className="flex w-full h-[400px] m-auto rounded-lg">
        { data.length != 0 ? (
           <Chart data={data.length ? data : initialData} name="Porcentaje"/>
        ) : (
          <div className="flex m-auto text-center text-cyan-600 text-2xl font-bold"> Aún no se tienen datos </div>
        ) }
        </div>
        </>
    )
}