import { ResponseInterface, StudentSubjectsRequestInterface } from "../../../shared";
import axios from '../../../api/axiosConfig'
import { AxiosError } from "axios";

export const StudentSubjectsModel = {

    getAllCurrentStudentSubjects: async (): Promise<ResponseInterface> => {
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

     getCurrentImageAsociateToStudentSubject: async (idImage: number): Promise<ResponseInterface> => {
            try {
                const response = await axios.get(`/subject/image/${idImage}`, {
                  responseType: 'blob'
                });
    
                const imageUrl = URL.createObjectURL(response.data);
                
                
                return {
                    success: true,
                    data: imageUrl,
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

        verifyIfStudentIsOnGroup: async (idGroup: number): Promise<ResponseInterface> => {
            try {
                const response = await axios.get(`/group/isEnroled/${idGroup}`);
                
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

        registerStudentOnCourse: async (registerInfo: StudentSubjectsRequestInterface): Promise<ResponseInterface> => {
            try {
                const response = await axios.post(`/group/enroll/`, registerInfo);
                
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