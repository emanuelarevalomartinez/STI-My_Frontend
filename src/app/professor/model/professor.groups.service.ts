import { AxiosError } from "axios";
import axios from '../../../api/axiosConfig'
import { GroupRequestInterface, ResponseInterface } from "../../../shared";

export const ProfessorGroupModel = {

    getAllGroups: async (): Promise<ResponseInterface> => {
        try {
            const response = await axios.get("/group");
            
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || error.message;
                return {
                    success: false,
                    error: errorMessage,
                };
            }
            return {
                success: false,
                error: "Error inesperado",
            };
        }
    },


createGroup: async (newGroup: GroupRequestInterface): Promise<ResponseInterface> => {
        try {
            const response = await axios.post("/group/", newGroup)
            return {
                success: true,
                data: response.data.data,
            };
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || error.message;
                return {
                    success: false,
                    error: errorMessage,
                };
            }
            return {
                success: false,
                error: "Error inesperado",
            };
        }
    },

    updateGroup: async (id: number, updateData: GroupRequestInterface): Promise<ResponseInterface> => {
        try {
          const response = await axios.patch(`/group/${id}`, updateData)
          
          return {
            success: true,
            data: response.data.data,
          };
        } catch (error) {
          if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || error.message;
            return {
              success: false,
              error: errorMessage,
            };
          }
          return {
            success: false,
            error: "Error inesperado",
          };
        }
      },


     deleteGroup: async (groupId: number): Promise<ResponseInterface> => {
            try {
                const response = await axios.delete(`/group/${groupId}`);
                
                return {
                    success: true,
                    data: response.data.data,
                };
            } catch (error) {
                if (error instanceof AxiosError) {
                    const errorMessage = error.response?.data?.message || error.message;
                    return {
                        success: false,
                        error: errorMessage,
                    };
                }
                return {
                    success: false,
                    error: "Error inesperado",
                };
            }
        },
  };
