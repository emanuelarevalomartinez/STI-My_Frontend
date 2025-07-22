import { ResponseInterface, SectionAsignateResourcesRequestInterface, SectionRequestInterface } from "../../../shared";
import axios from "../../../api/axiosConfig";
import { AxiosError } from "axios";

export const ProfessorSectionModel = {
  getAllSections: async (): Promise<ResponseInterface> => {
    try {
      const response = await axios.get("/session");

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

  createSection: async (
    newSection: SectionRequestInterface
  ): Promise<ResponseInterface> => {
    try {
      const response = await axios.post("/session/", newSection);
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

  updateSection: async (
    id: number,
    updateData: SectionRequestInterface
  ): Promise<ResponseInterface> => {
    try {
      const response = await axios.patch(`/session/${id}`, updateData);

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

  deleteSection: async (sectionId: number): Promise<ResponseInterface> => {
    try {
      const response = await axios.delete(`/session/${sectionId}`);

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

  getAllResourcesToAsignASection: async (
    limit: number = 10,
    page: number = 1
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

  asignateResourcesToASelectedSection: async (sectionAndNewResourcesAsociated: SectionAsignateResourcesRequestInterface): Promise<ResponseInterface> => {
    try {
      const response = await axios.post(`/session/assing/`, sectionAndNewResourcesAsociated);

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
