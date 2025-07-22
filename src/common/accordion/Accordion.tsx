import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ArrayCurrentSubjectWithExpandedResponse } from "../../shared";
import { FcDownload } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { NotFoundData } from "../errors";

interface Props {
  currentCourseResourcesForAccordeon: ArrayCurrentSubjectWithExpandedResponse[];
  handleChangeVisibilityOfElementOnAccordeon: (e: number) => void;
  openResource: (e: string) => void;
}

export function Accordion({
  currentCourseResourcesForAccordeon,
  handleChangeVisibilityOfElementOnAccordeon,
  openResource,
}: Props) {
  const downloadResource = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    const finalFilename = url.split("/").pop() || "download";
    link.setAttribute("download", finalFilename);
    link.setAttribute("target", "_blank");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full mx-auto mt-6">
      <ul className="rounded-md overflow-hidden divide-y divide-gray-200 shadow-xl bg-white">
        {currentCourseResourcesForAccordeon.length !== 0 ? (
          currentCourseResourcesForAccordeon.map((item, index) => (
            <li
              key={`section-${item.section[Object.keys(item.section)[0]][0]?.id || index}`}
              className="relative"
            >
              <div
                className="flex items-center justify-between px-6 py-4 bg-sky-500 text-white shadow-md cursor-pointer"
                onClick={() => handleChangeVisibilityOfElementOnAccordeon(index)}
              >
                <span className="font-semibold tracking-wide">
                  Sección #{item.section[Object.keys(item.section)[0]][0]?.id || ""}
                </span>
                {item.expandedElement ? (
                  <IoIosArrowUp className="w-6 h-6" />
                ) : (
                  <IoIosArrowDown className="w-6 h-6" />
                )}
              </div>

              <div
                className={`transition-all duration-500 ease-in-out ${
                  item.expandedElement ? "max-h-[500px]" : "max-h-0"
                } overflow-hidden bg-white border-x border-b border-indigo-300 rounded-b-md`}
              >
                <div className="p-6 text-sm text-gray-700 space-y-4">
                  <div className="flex flex-col gap-y-2 md:flex-row md:gap-x-4">
                    <span className="text-gray-900 font-semibold">Descripción:</span>
                    <span>
                      {item.section[Object.keys(item.section)[0]][0]?.description || "Sin descripción"}
                    </span>
                  </div>
                  <div className="flex gap-x-4 justify-end">
                    <FaEye
                      className="w-5 h-5 text-indigo-600 hover:scale-110 transition-transform cursor-pointer"
                      onClick={() => openResource(item.section[Object.keys(item.section)[0]][0]?.url)}
                    />
                    <FcDownload
                      className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
                      onClick={() =>
                        downloadResource(item.section[Object.keys(item.section)[0]][0]?.url)
                      }
                    />
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <NotFoundData />
        )}
      </ul>
    </div>
  );
}
