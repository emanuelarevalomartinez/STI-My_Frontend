import { AxiosError } from "axios";
import axios from '../../../api/axiosConfig'
import { ResponseInterface } from "../../../shared/interfaces";


export const StudentModel = {
    setStudentLearnigStyle: async (learningStyle: string): Promise<ResponseInterface> => {
        
        try {
            const response = await axios.post("/student/setLearningStyle/", { learningStyle: learningStyle });
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
}