import { FaChartPie, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { HandleActionsTable } from "../../shared";
import { FcFlashOff, FcFlashOn } from "react-icons/fc";

interface Props<T extends { active?: string, role?: string }> {
  columns: Record<string, string>;
  data: T[];
  handleActions?: HandleActionsTable<T>;
}

export function Table<T extends object>({
  columns,
  data,
  handleActions,
}: Props<T>) {

  return (
    <div className="rounded-xl overflow-hidden">
      <div className="relative overflow-x-auto">
        <table className="hidden md:table w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-700 text-nowrap">
            <tr>
              {Object.values(columns).map((column, index) => (
                <th 
                  key={index} 
                  scope="col" 
                  className="px-6 py-4 font-medium text-gray-50"
                >
                  {String(column)}
                </th>
              ))}
              { handleActions !== undefined ? 
              ( <th scope="col" className="px-6 py-4 font-medium text-gray-50">
                Acciones
              </th> ) : 
              ( <></> ) 
            }
              
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-nowrap">
            {data.map((item, index) => (
              <tr 
                key={index} 
                className="bg-white hover:bg-gray-300 transition-colors duration-150"
              >
                {Object.keys(columns).map((key) => (
                  <td 
                    key={String(key)} 
                    className="px-6 py-4 text-gray-600"
                  >
                    {item[key as keyof T] as React.ReactNode}
                  </td>
                ))}
                { handleActions !== undefined ? (
                   <td className="px-6 py-4">
                   <div className="flex gap-x-2 justify-start sm:justify-end">
                      <button
                       onClick={() => handleActions.onFastAction(item)}
                       disabled={'active' in item && item.active == "Activo"}
                       className="text-yellow-500 hover:text-yellow-700 transition-colors duration-150"
                       aria-label="Editar"
                     >
                      {'active' in item && item.active == "Activo" ? 
                        (  <FcFlashOn className="w-5 h-5" /> ) : ( <FcFlashOff className="w-5 h-5" />)
                      }
                     </button>
                     <button
                       onClick={() => handleActions.onEdit(item)}
                       className="text-blue-500 hover:text-blue-700 transition-colors duration-150"
                       aria-label="Editar"
                     >
                       <FaRegEdit className="w-5 h-5" />
                     </button>
                     <button
                       onClick={() => handleActions.onViewChart(item)}
                       className="text-green-500 hover:text-green-700 transition-colors duration-150"
                       aria-label="Ver gráfico"
                     >
                      {'role' in item && item.role == "Estudiante" ? 
                        (  <FaChartPie className="w-5 h-5" /> ) : ( <> </> )
                      }
                     </button>
                     <button
                       onClick={() => handleActions.onDelete(item)}
                       className="text-red-500 hover:text-red-700 transition-colors duration-150"
                       aria-label="Eliminar"
                     >
                       <FaRegTrashAlt className="w-5 h-5" />
                     </button>
                   </div>
                 </td>
                ) : (
                  <></>
                ) }
                
              </tr>
            ))}
          </tbody>
        </table>

        {/* Movile view */}
        <div className="md:hidden space-y-4 p-4">
          {data.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
              {Object.entries(columns).map(([key, label]) => (
                <div key={String(key)} className="mb-2">
                  <span className="font-semibold text-gray-600">
                    {label}
                  </span>
                  <span className="text-gray-800 ml-2">
                    {item[key as keyof T] as React.ReactNode}
                  </span>
                </div>
              ))}
              { handleActions !== undefined ? 
              (
<div className="flex gap-x-4 mt-3">
                <button
                  onClick={() => handleActions.onFastAction(item)}
                  disabled={'active' in item && item.active == "Activo"}
                  className="text-yellow-500 hover:text-yellow-700 transition-colors duration-150"
                  aria-label="Editar"
                >
                  {'active' in item && item.active == "Activo" ? 
                    (  <FcFlashOn className="w-5 h-5" /> ) : ( <FcFlashOff className="w-5 h-5" />)
                  }
                </button>
                <button
                  onClick={() => handleActions.onEdit(item)}
                  className="text-blue-500 hover:text-blue-700"
                  aria-label="Editar"
                >
                  <FaRegEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleActions.onViewChart(item)}
                  className="text-green-500 hover:text-green-700"
                  aria-label="Ver gráfico"
                >
                  {'role' in item && item.role == "Estudiante" ? 
                       (  <FaChartPie className="w-5 h-5" /> ) : ( <> </> )
                  }
                </button>
                <button
                  onClick={() => handleActions.onDelete(item)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Eliminar"
                >
                  <FaRegTrashAlt className="w-5 h-5" />
                </button>
              </div>
              ) : 
              ( <></> ) 
            }
            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
