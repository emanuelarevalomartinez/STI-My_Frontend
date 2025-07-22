import { createSlice } from "@reduxjs/toolkit";
import { setStudentFirstTimeOnSystemLocalStorage } from "../../../store/browser";
import { SubjectInterface } from "../../../shared";

interface CouterState {
  isStudentFirstTimeOnTheSistem: boolean,
  initialStudentFormCurrentPage: number,
  studentSubjects: SubjectInterface[],
  errorMessageStudentSubjects: string | null;
  isModalStudentCurrentSubjectOpen: boolean;
}

const initialState: CouterState  = {
  isStudentFirstTimeOnTheSistem: false,
  initialStudentFormCurrentPage: 0,
  studentSubjects: [],
  errorMessageStudentSubjects: null,
  isModalStudentCurrentSubjectOpen: false,
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setIsStudentFirstTimeOnTheSistem(state, action) {
      state.isStudentFirstTimeOnTheSistem = action.payload;
      setStudentFirstTimeOnSystemLocalStorage(action.payload);
    },
    setInitialStudentFormPage(state, action) {
      state.initialStudentFormCurrentPage = action.payload;
    },
    setStudentSubjects(state, action) {
      state.studentSubjects = action.payload;
    },
    setErrorMessageStudentSubjects(state, action) {
      state.errorMessageStudentSubjects = action.payload;
    },
    setIModalStudentCurrentSubjectOpen(state, action) {
      state.isModalStudentCurrentSubjectOpen = action.payload;
    },
  },
});

export const {
  setIsStudentFirstTimeOnTheSistem,
  setInitialStudentFormPage,
  setStudentSubjects,
  setErrorMessageStudentSubjects,
  setIModalStudentCurrentSubjectOpen,
} = studentSlice.actions;
export const studentReducer = studentSlice.reducer;
