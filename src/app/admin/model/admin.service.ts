import { AxiosError } from "axios";
import axios from '../../../api/axiosConfig'
import { ResponseInterface } from "../../../shared/interfaces";

export const AdminModel = {

    getAllUsers: async (): Promise<ResponseInterface> => {
        try {
            const response = await axios.get("/student/");
            return {
                success: true,
                data: response.data,
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
