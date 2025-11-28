import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: {
        loading: false,
        error: null,
        message: null,
        isAuthenticated:false
    },
    reducers: {
        forgotPasswordRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        forgotPasswordSuccess(state, action) {
            state.loading = false;
            state.error = false;
            state.message = action.payload;
        },
        forgotPasswordFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        resetPasswordRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        resetPasswordSuccess(state, action) {
            state.loading = false;
            state.error = false;
            state.isAuthenticated=true;
            state.message = action.payload;
        },
        resetPasswordFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        clearAllErrors(state, action) {
            state.error = null;
        }
    }
});

export const forgotPassword = (email) => async (dispatch) => {
    dispatch(forgotPasswordSlice.actions.forgotPasswordRequest());
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/forgot-password`, { email }, {
            withCredentials: true, headers: {
                "content-Type": "application/json"
            }
        })
        dispatch(forgotPasswordSlice.actions.forgotPasswordSuccess(data.message));
        dispatch(forgotPasswordSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(forgotPasswordSlice.actions.forgotPasswordFailed(error.response.data.message));
    }
}

export const resetPassword = (email,otp,newPassword) => async (dispatch) => {
    dispatch(forgotPasswordSlice.actions.resetPasswordRequest());
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/reset-password/${email}`, { otp,newPassword }, {
            withCredentials: true, headers: {
                "content-Type": "application/json"
            }
        });
        dispatch(forgotPasswordSlice.actions.resetPasswordSuccess(data.message));
        dispatch(forgotPasswordSlice.actions.clearAllErrors())
    } catch (error) {
        dispatch(forgotPasswordSlice.actions.resetPasswordFailed(error.response?.data?.message));
    }
}

export const clearAllForgotPasswordErrors = () => (dispatch) => {
    dispatch(forgotPasswordSlice.actions.clearAllErrors());
}

export default forgotPasswordSlice.reducer