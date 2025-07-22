import { createSlice } from "@reduxjs/toolkit";
import { ChatResponseInterface } from "../../../shared";

interface CouterState {
    chatMessages: ChatResponseInterface[];
    isChatModalOpen: boolean;
}

const initialState: CouterState = {
  chatMessages: [],
  isChatModalOpen: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatMessages(state, action) {
      state.chatMessages = action.payload;
    },
    setIsChatModalOpen(state, action) {
      state.isChatModalOpen = action.payload;
    },
  },
});

export const { setChatMessages, setIsChatModalOpen } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
