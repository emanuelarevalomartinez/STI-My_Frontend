import { createSlice } from "@reduxjs/toolkit";
import { GroupInterface, GroupSpecificInfoToShowInterface, ResourceInterface, ResourcesToAsignateASectionInterface, SectionInterface } from "../../../shared";

interface CouterState {
    groups: GroupInterface[];
    sections: SectionInterface[];
    resources: ResourceInterface[];
    studentsOnGroup: GroupSpecificInfoToShowInterface[];
    currentSubject: GroupInterface;
    resourcesToAsignateASection: ResourcesToAsignateASectionInterface[];
    errorMessageProfessorGroup: string | null;
    errorMessageProfessorSection: string | null;
    errorMessageProfessorResource: string | null;

}

const initialState: CouterState = {
    groups: [],
    sections: [],
    resources: [],
    studentsOnGroup: [],
    resourcesToAsignateASection: [],
    errorMessageProfessorGroup: null,
    errorMessageProfessorSection: null,
    errorMessageProfessorResource: null,
    currentSubject: {
      id: -1,
      key: "",
      name: "",
    }
}


export const professorSlice = createSlice({
  name: "professor",
  initialState,
  reducers: {
    setGroups(state, action){
        state.groups = action.payload;
      },
    setErrorMessageProfessorGroup(state, action){
        state.errorMessageProfessorGroup = action.payload;
      },
    setSections(state, action){
        state.sections = action.payload;
      },
    setResourcesToAsignateASection(state, action){
        state.resourcesToAsignateASection = action.payload;
      },
    setErrorMessageProfessorSection(state, action){
        state.errorMessageProfessorSection = action.payload;
      },
    setResources(state, action){
        state.resources = action.payload;
      },
    setStudentsOnGroup(state, action){
        state.studentsOnGroup = action.payload;
      },
    setErrorMessageProfessorResource(state, action){
        state.errorMessageProfessorResource = action.payload;
      },
  }
})

export const { setGroups, setErrorMessageProfessorGroup, setSections, setErrorMessageProfessorSection, setResources, setErrorMessageProfessorResource, setStudentsOnGroup, setResourcesToAsignateASection } = professorSlice.actions;
export const professorReducer = professorSlice.reducer;