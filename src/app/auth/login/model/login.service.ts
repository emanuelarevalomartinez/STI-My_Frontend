import { AxiosError } from "axios";
import axios from '../../../../api/axiosConfig'
import { LoginRequestInterface, ResponseInterface } from "../../../../shared/interfaces";

export const LoginModel = {

    loginUser: async (userData: LoginRequestInterface): Promise<ResponseInterface> => {
        try {
            const response = await axios.post("/auth/login/", userData);
            
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
