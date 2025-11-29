import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
    name: "Application",
    initialState: {
        loading: null,
        error: null,
        applications: [],
        message: null,
    },
    reducers: {
        getAllApplicationRequest(state, action) {
            state.loading = true;
        },
        getAllApplicationSuccess(state, action) {
            state.loading = false;
            state.applications = action.payload;
        },
        getAllApplicationFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        deleteApplicationRequest(state, action) {
            state.loading = true;
        },
        deleteApplicationSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
        },
        deleteApplicationFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        addApplicationRequest(state, action) {
            state.loading = true;
        },
        addApplicationSuccess(state, action) {
            state.loading = false;
            state.applications = action.payload.application;
            state.message = action.payload.message;
        },
        addApplicationFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        resetApplicationSlice(state, action) {
            state.error = null;
            state.message = null;
            state.loading = null;
        },

        clearAllApplicationError(state, action) {
            state.error = null;
        }

    }
});

export const getAllApplication = () => async (dispatch) => {
    dispatch(applicationSlice.actions.getAllApplicationRequest());
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-software`);
        dispatch(applicationSlice.actions.getAllApplicationSuccess(data.getAllApplication));
        dispatch(applicationSlice.actions.clearAllApplicationError());
    } catch (error) {
        dispatch(applicationSlice.actions.getAllApplicationFailed(error.response?.data?.message));
    }
}

export const addApplication = (formData) => async (dispatch) => {
    dispatch(applicationSlice.actions.addApplicationRequest());
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/software-add`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/formData"
            }
        });
        dispatch(applicationSlice.actions.addApplicationSuccess({
            application: data.softwareApplication,
            message: data.message
        }));
        dispatch(applicationSlice.actions.clearAllApplicationError())
    } catch (error) {
        dispatch(applicationSlice.actions.addApplicationFailed(error.response?.data?.message));
    }
}

export const deleteApplication = (_id) => async (dispatch) => {
    dispatch(applicationSlice.actions.deleteApplicationRequest());
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/${_id}`, {
            withCredentials: true
        });
        dispatch(applicationSlice.actions.deleteApplicationSuccess(data.message));
        dispatch(applicationSlice.actions.clearAllApplicationError());
    } catch (error) {
        dispatch(applicationSlice.actions.deleteApplicationFailed(error.response?.data.message));
    }
}

export const resetApplicationSliceError = () => (dispatch) => {
    dispatch(applicationSlice.actions.resetApplicationSlice());
}

export const clearAllApplicationSliceErrors = () => (dispatch) => {
    dispatch(applicationSlice.actions.clearAllApplicationError());
}

export default applicationSlice.reducer;