import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  errorMessageRegister: null,
  serverResponseRegisterRegister: true,
}


export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setErrorMessageRegister(state, action){
       state.errorMessageRegister = action.payload;
    },
  }
})

export const {
  setErrorMessageRegister
 } = registerSlice.actions;
export const registerReducer = registerSlice.reducer