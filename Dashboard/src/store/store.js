import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import ForgotPasswodReducer from "./forgotPasswordSlice";
import messageReducer from "./messageSlice";


export const store = configureStore({
    reducer:{
        user:userReducer,
        forgotPassword:ForgotPasswodReducer,
        messagesStore:messageReducer,
    }
})