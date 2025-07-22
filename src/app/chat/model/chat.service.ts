import { AxiosError } from 'axios';
import axios from '../../../api/axiosConfig'
import { ChatRequestInterface, ResponseInterface } from '../../../shared';


export const ChatModel = {
    sendMessage: async ( message: ChatRequestInterface ): Promise<ResponseInterface> => {
        
        try {
            const response = await axios.post("/chatbot/",  message );
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

    getAllMessages: async ( ): Promise<ResponseInterface> => {
        
        try {
            const response = await axios.get("/chatbot/");
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

    deleteAllAllMessages: async ( ): Promise<ResponseInterface> => {
        
        try {
            const response = await axios.delete("/chatbot/");
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