import { createSlice } from "@reduxjs/toolkit";
import { getAuthPageLocalStorageOrLogin, setAuthPageLocalStorage } from "../../../../store/browser";


const initialState = {
    errorMessageLogin: null,
    authView : getAuthPageLocalStorageOrLogin(),
}


export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setErrorMessageLogin(state, action){
       state.errorMessageLogin = action.payload;
     },
     setAuthView(state, action){
      state.authView = action.payload;
      setAuthPageLocalStorage(action.payload);
    },
  }
})

export const { setErrorMessageLogin, setAuthView } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;