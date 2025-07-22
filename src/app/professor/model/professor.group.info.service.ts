import { ResponseInterface } from "../../../shared";
import axios from '../../../api/axiosConfig'
import { AxiosError } from "axios";

export const ProfessorGroupInfoModel = {

    getAllGroupInfo: async (idGroup: number): Promise<ResponseInterface> => {
        try {
            const response = await axios.get(`/group/users/${idGroup}`);
            
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

}