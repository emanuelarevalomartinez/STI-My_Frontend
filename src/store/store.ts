import { configureStore } from "@reduxjs/toolkit";
import { loginReducer, registerReducer } from "../app/auth";
import { generalReducer } from "./slices";
import { adminReducer, chatReducer, professorReducer, studentReducer } from "../app";

const store = configureStore({
    reducer: {
        general: generalReducer,
        login: loginReducer,
        register: registerReducer,
        student: studentReducer,
        admin: adminReducer,
        professor: professorReducer,
        chat: chatReducer,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

