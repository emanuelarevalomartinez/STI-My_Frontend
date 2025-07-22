import { createSlice } from "@reduxjs/toolkit"


interface CouterState {
    viewMenuBar: boolean;
    isDeskTopView: boolean;
    errorMessageUserUpdatePassword: string | null;

}

const initialState: CouterState = {
    viewMenuBar: true,
    isDeskTopView: true,
    errorMessageUserUpdatePassword: null,
}


export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setShowMenuBar(state,action){
         state.viewMenuBar = action.payload;
    },
    setIsDeskTopView(state, action){
         state.isDeskTopView = action.payload;
    },
    setErrorMessageUserUpdatePassword(state, action){
      state.errorMessageUserUpdatePassword = action.payload;
    },
  }
})


export const { setShowMenuBar, setIsDeskTopView, setErrorMessageUserUpdatePassword } = generalSlice.actions;
export const generalReducer = generalSlice.reducer;

