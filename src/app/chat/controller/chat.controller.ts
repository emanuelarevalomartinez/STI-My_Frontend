import { ChatModel, setChatMessages } from "../model";
import { ChatRequestInterface, ChatResponseInterface, deleteAllBrowserData } from "../../../shared";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useState } from "react";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../routes";

interface UseChatController {
  updateView: boolean;
  chatMessages: ChatResponseInterface[];
  getAllChat: () => Promise<void>;
  setNewMessage: (e: ChatRequestInterface) => void;
  newMessage: ChatRequestInterface;
  sendNewMessage: () => Promise<void>;
  deleteMessages: () => Promise<void>;
  waithingMessageResponse: boolean;
}

export const useChatController = (): UseChatController => {
  const dispatchChat = useDispatch<AppDispatch>();
  const chatMessages = useSelector<RootState, ChatResponseInterface[]>(
    (store) => store.chat.chatMessages
  );

  const navigate = useNavigate();

  const [newMessage, setNewMessage] = useState<ChatRequestInterface>({
    message: "",
  });
  const [updateView, setUpdateView] = useState(false);

  const [waithingMessageResponse, setWaithingMessageResponse] = useState(false);

  const getAllChat = async () => {
    const response = await ChatModel.getAllMessages();

    if (response.error) {
      setTimeout(() => {
        deleteAllBrowserData();
        navigate(APP_ROUTES.LOGIN);
      }, 2000);
    } else {
      let data: ChatResponseInterface[] = response.data.chats;

      data.forEach((item) => {
        const fechaBot = new Date(Number(item.createAtMessageBot));
        const fechaStudent = new Date(Number(item.createAtMessageStudent));

        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        };

        item.createAtMessageBot = fechaBot.toLocaleString("es-ES", options);
        item.createAtMessageStudent = fechaStudent.toLocaleString(
          "es-ES",
          options
        );
      });

      data.reverse();
      dispatchChat(setChatMessages(data));
    }
  };

  const sendNewMessage = async () => {
    setWaithingMessageResponse(true);

    const response = await ChatModel.sendMessage(newMessage);

    if (response.error) {
      setTimeout(() => {
        deleteAllBrowserData();
        navigate(APP_ROUTES.LOGIN);
      }, 2000);
    } else {
      setNewMessage({
        message: "",
      });
      setTimeout(() => {
        setWaithingMessageResponse(false);
        setUpdateView(!updateView);
      }, 2000);
    }
  };

  const deleteMessages = async () => {
    if (chatMessages.length !== 0) {
      const response = await ChatModel.deleteAllAllMessages();
      if (response.error) {
        setTimeout(() => {
          deleteAllBrowserData();
          navigate(APP_ROUTES.LOGIN);
        }, 2000);
      } else {
        setUpdateView(!updateView);
      }
    }
  };

  return {
    updateView,
    chatMessages,
    getAllChat,
    newMessage,
    setNewMessage,
    sendNewMessage,
    deleteMessages,
    waithingMessageResponse,
  };
};
