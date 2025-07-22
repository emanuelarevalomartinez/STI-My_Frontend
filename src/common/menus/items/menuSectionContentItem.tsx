import { FaAngleDown, FaAngleLeft, FaGraduationCap } from "react-icons/fa";
import { MenuSectionChildrenItem } from "./menuSectionChildrenItem";
import { useState } from "react";
import { MenuChildElement } from "../Menu";

interface Props{
    title: string;
    childs: MenuChildElement[];
}

export function MenuSectionContentItem({title, childs}:Props) {

const [viewChildrens, setViewChildrens] = useState(false);

  return (
    <>
    <div>
    <div className="flex font-medium items-center cursor-pointer justify-between gap-x-2 text-gray-700 p-2 hover:bg-gray-700 hover:text-white text-base rounded-md"
    onClick={ ()=> { setViewChildrens(!viewChildrens);
     } }
    >
        <div className="flex items-center gap-x-2">
          <FaGraduationCap />
          <p>{title}</p>
        </div>
        { viewChildrens ? <FaAngleDown /> : <FaAngleLeft /> }
      </div>

         <div>
            { viewChildrens && childs.map( (childs, index)=> (
                <div key={index} className="pl-8">
                <MenuSectionChildrenItem 
                url={childs.address}
                >
                    {childs.title}
                </MenuSectionChildrenItem>
                </div>
            ) ) }
         </div>

    </div>
    </>
  );
}
