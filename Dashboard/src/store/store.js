import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import ForgotPasswodReducer from "./forgotPasswordSlice";


export const store = configureStore({
    reducer:{
        user:userReducer,
        forgotPassword:ForgotPasswodReducer
    }
})