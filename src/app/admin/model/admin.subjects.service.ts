

import { AxiosError } from "axios";
import axios from '../../../api/axiosConfig'
import { ResponseInterface } from "../../../shared/interfaces";

export const AdminSubjectsModel = {

    getAllCurrentSubjects: async (): Promise<ResponseInterface> => {
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

    getCurrentImageAsociateToSubject: async (idImage: number): Promise<ResponseInterface> => {
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

    createNewSubject: async (subjectFormData: FormData): Promise<ResponseInterface> => {
        try {
            const response = await axios.post("/subject/", subjectFormData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
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

    deleteSubject: async (subjectId: number): Promise<ResponseInterface> => {
        try {
            const response = await axios.delete(`/subject/${subjectId}`);
            
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

    updateSubject: async (id: number, formData: FormData): Promise<ResponseInterface> => {
        try {
          const response = await axios.patch(`/subject/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
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
