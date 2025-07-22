import { AxiosError } from "axios";
import axios from '../../../../api/axiosConfig'
import { RegisterProfessorRequestInterface, RegisterStudentRequestInterface, ResponseInterface } from "../../../../shared/interfaces";


export const RegisterModel = {
    registerUser: async (userData: RegisterStudentRequestInterface | RegisterProfessorRequestInterface): Promise<ResponseInterface> => {
        try {
            const response = await axios.post("/user/", userData);
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
                error: "Unexpected Error",
            };
        }
    },

    getAllCurrentsSubjects: async (): Promise<ResponseInterface> => {
        try {
            const response = await axios.get("/subject/");
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
                error: "Unexpected Error",
            };
        }
    },
}


