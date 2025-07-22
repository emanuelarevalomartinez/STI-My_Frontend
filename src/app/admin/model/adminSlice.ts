import { createSlice } from "@reduxjs/toolkit";
import { SubjectInterface, UserInterface } from "../../../shared";

interface CouterState{
    subjects: SubjectInterface[];
    users: UserInterface[];
    setErrorMessageAdminSubject: string | null;
    setErrorMessageAdminUpdateUser: string | null;

}

const initialState: CouterState = {
    subjects: [],
    users: [],
    setErrorMessageAdminSubject: null,
    setErrorMessageAdminUpdateUser: null,
}


export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSubjects(state, action){
       state.subjects = action.payload;
     },
    addSubject(state, action){
       state.subjects.push(action.payload);
    },
    setUsers(state, action){
      state.users = action.payload;
   },
    setErrorMessageAdminSubject(state, action){
      state.setErrorMessageAdminSubject = action.payload;
    },
    setErrorMessageAdminUpdateUser(state, action){
      state.setErrorMessageAdminUpdateUser = action.payload;
    },
    
  }
})

export const { setSubjects, addSubject, setUsers, setErrorMessageAdminSubject, setErrorMessageAdminUpdateUser } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;