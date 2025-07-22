import { AxiosError } from "axios";
import axios from "../../../api/axiosConfig";
import { ResponseInterface, UserRequestInterface } from "../../../shared/interfaces";

export const AdminUsersModel = {
  getAllCurrentUsers: async (
    limit: number = 10,
    page: number = 1,
    searchTerm?: string,
    role?: string
  ): Promise<ResponseInterface> => {
    try {
      let response: ResponseInterface = {
        success: true,
        data: "",
        error: "",
      };

      if (!searchTerm && !role) {
        response = await axios.get(`/user?page=${page}&limit=${limit}`);
      } else if (searchTerm && role) {
        response = await axios.get(
          `/user?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role=${role}`
        );
      } else if (searchTerm) {
        response = await axios.get(
          `/user?page=${page}&limit=${limit}&searchTerm=${searchTerm}`
        );
      } else if (role) {
        response = await axios.get(
          `/user?page=${page}&limit=${limit}&role=${role}`
        );
      }

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

  updateUser: async (
    id: number,
    updateData: UserRequestInterface
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

  deleteUser: async (userId: number): Promise<ResponseInterface> => {
    try {
      const response = await axios.delete(`/user/${userId}`);

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

  getStudentLearningStyle: async (
    studentId: number
  ): Promise<ResponseInterface> => {
    try {
      const response = await axios.get(
        `/student/getLearningStyle/${studentId}`
      );

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

  activateUser: async (
    userId: number
  ): Promise<ResponseInterface> => {
    try {
      const response = await axios.get(
        `/user/activate/${userId}`
      );

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
