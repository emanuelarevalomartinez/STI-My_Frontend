import { AxiosError } from "axios";
import axios from '../../../api/axiosConfig'
import { ResponseInterface, UserRequestUpdatePassword } from "../../../shared";

export const UserHomeModel = {

    updatePassword: async (
       id: number,
       updateData: UserRequestUpdatePassword
     ): Promise<ResponseInterface> => {
       try {
         const response = await axios.patch(`/user/${id}`, updateData);
   
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

     gettAllUsersToDataInfo: async (): Promise<ResponseInterface> => {
      try {
        const response = await axios.get("/user/count/");
  
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

    getAllCurrentSubjectsToDataInfo: async (): Promise<ResponseInterface> => {
      try {
          const response = await axios.get("/subject/");
          
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
