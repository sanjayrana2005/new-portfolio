import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import ForgotPasswodReducer from "./forgotPasswordSlice";
import messageReducer from "./messageSlice";
import timelineReducer from "./timelineSlice"
import skillReducer from "./skillSlice";

export const store = configureStore({
    reducer:{
        user:userReducer,
        forgotPassword:ForgotPasswodReducer,
        messagesStore:messageReducer,
        timeline:timelineReducer,
        skill:skillReducer
    }
})