import { ResourceRequestInterfaceUpdate, ResponseInterface } from "../../../shared";
import axios from '../../../api/axiosConfig'
import { AxiosError } from "axios";

export const ProfessorResourceModel = {

    getAllResources: async (
        limit: number = 10,
        page: number = 1,
      ): Promise<ResponseInterface> => {
        try {
          let response: ResponseInterface = {
            success: true,
            data: "",
            error: "",
          };
    
          response = await axios.get(`/resource?page=${page}&limit=${limit}`);
    
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

      createResource: async (newResourceFile: FormData): Promise<ResponseInterface> => {
              try {
                  const response = await axios.post("/resource/", newResourceFile, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  })
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
      
          updateResource: async (id: number, formData: ResourceRequestInterfaceUpdate): Promise<ResponseInterface> => {
              try {
                const response = await axios.patch(`/resource/${id}`, formData)
                
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
      
      
           deleteResource: async (resourceId: number): Promise<ResponseInterface> => {
                  try {
                      const response = await axios.delete(`/resource/${resourceId}`);
                      
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

              getAllCurrentsSections: async (): Promise<ResponseInterface> => {
                try {
                    const response = await axios.get(`/session/`);
                    
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