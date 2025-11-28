import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: {},
        isAuthenticated: false,
        error: null,
        message: null,
        isUpdated: false
    },
    reducers: {
        loginRequest(state, action) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
            state.error = null;
        },
        loginFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        loadUserRequest(state, action) {
            state.loading = true;       
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loadUserFailed(state, action) {
            state.loading = false;
            state.error = null;
        },

        logoutUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.message = action.payload; 
        },
        logoutUserFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updatePasswordRequest(state, action) {
            state.loading = true;
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },
        updatePasswordSuccess(state, action) {
            state.loading = false;
            state.isUpdated = true;
            state.message = action.payload;
            state.error = null;
        },
        updatePasswordFailed(state, action) {
            state.loading = false;
            state.isUpdated = false;
            state.message = null;
            state.error = action.payload;
        },
        updateProfileRequest(state, action) {
            state.loading = true;
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },
        updateProfileSuccess(state, action) {
            state.loading = false;
            state.isUpdated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
            state.error = null;
        },
        updateProfileFailed(state, action) {
            state.loading = false;
            state.isUpdated = false;
            state.message = null;
            state.error = action.payload;
        },
        updateProfileResetAfterUpdate(state, action) {
            state.error = null;
            state.isUpdated = null;
            state.message = null;
        },
        clearAllErrors(state, payload) {
            state.error = null;
        }
    },
});

export const login = (email, password) => async (dispatch) => {
    dispatch(userSlice.actions.loginRequest());
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/login`,
            { email, password },
            {
                withCredentials: true, headers: {
                    "Content-Type": "application/json"
                }
            });
        dispatch(userSlice.actions.loginSuccess({
           user: data.user,
           message:data.message
        }));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response.data.message))
    }
}

export const getUser = () => async (dispatch) => {
    dispatch(userSlice.actions.loadUserRequest());
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/me`,
            {
                withCredentials: true
            });
        dispatch(userSlice.actions.loadUserSuccess(data.user));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.loadUserFailed(error.response.data.message))
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/logout`,
            {
                withCredentials: true
            });
        dispatch(userSlice.actions.clearAllErrors());
        dispatch(userSlice.actions.logoutUserSuccess(data.message));
    } catch (error) {
        dispatch(userSlice.actions.logoutUserFailed(error.response.data.message))
    }
}

export const updatePassword = (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
        const { data } = await axios.patch(`${import.meta.process.env.VITE_BACKEND_BASE_URL}/update-password`, { currentPassword, newPassword, confirmNewPassword }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch(userSlice.actions.updatePasswordSuccess(data.message));
        dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(userSlice.actions.updatePasswordFailed(error.response.data.message));
    }
}

export const updateProfile = (data) => async(dispatch) => {
    dispatch(userSlice.actions.updateProfileRequest());
    try {
        const {data}=await axios.patch(`${import.meta.process.env.VITE_BACKEND_BASE_URL}/update-profile`,{data},{
            withCredentials:true,
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
        dispatch(userSlice.actions.updateProfileSuccess({
            user:data.updatedUser,
            message:data.message
        }));
    } catch (error) {
        dispatch(userSlice.actions.updateProfileFailed(error.response.data.message));
    }
}

export const resetProfile = () => (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors.updateProfileResetAfterUpdate());
}

export const clearAllUserErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
}

export default userSlice.reducer