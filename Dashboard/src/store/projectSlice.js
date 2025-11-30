import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        loading: null,
        error: null,
        projects: [],
        message: null,
        singleProject: []
    },
    reducers: {
        getAllProjectsRequest(state, action) {
            state.loading = true;
        },
        getAllProjectsSuccess(state, action) {
            state.loading = false;
            state.projects = action.payload;
        },
        getAllProjectsFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },


        deleteProjectRequest(state, action) {
            state.loading = true;
        },
        deleteProjectSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
        },
        deleteProjectFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },


        addProjectsRequest(state, action) {
            state.loading = true;
        },
        addProjectsSuccess(state, action) {
            state.loading = false;
            state.projects = action.payload.project;
            state.message = action.payload.message;
        },
        addProjectsFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        resetProjectSliceError(state, action) {
            state.error = null;
            state.message = null;
            state.loading = null;
        },

        clearAllProjectErrors(state, action) {
            state.error = null
        }
    }
});


export const getAllProjects = () => async (dispatch) => {
    dispatch(projectSlice.actions.getAllProjectsRequest());
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/getall-project`);
        dispatch(projectSlice.actions.getAllProjectsSuccess(data.allProject));
        dispatch(projectSlice.actions.clearAllProjectErrors());
    } catch (error) {
        dispatch(projectSlice.actions.getAllProjectsFailed(error.response?.data?.message));
    }
}

export const addProject = (formData) => async (dispatch) => {
    dispatch(projectSlice.actions.addProjectsRequest());
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/add-project`,formData,{
            withCredentials:true,
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
        dispatch(projectSlice.actions.addProjectsSuccess({
            project:data.newProject,
            message:data.message
        }));
        dispatch(projectSlice.actions.clearAllProjectErrors());
    } catch (error) {
        dispatch(projectSlice.actions.addProjectsFailed(error.response?.data?.message));
    }
}

export const deleteProject = (id) => async (dispatch) => {
    dispatch(projectSlice.actions.deleteProjectRequest());
    try {
        const {data} = await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/delete-project/${id}`,{
            withCredentials:true,
        });
        dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllProjectErrors());
    } catch (error) {
       dispatch(projectSlice.actions.deleteProjectFailed(error.response?.data?.message)) 
    }
}

export const clearAllProjectSliceError = ()=>(dispatch) => {
    dispatch(projectSlice.actions.clearAllProjectErrors())
}

export const resetProjectSlice = () => (dispatch) => {
    dispatch(projectSlice.actions.resetProjectSliceError());
}

export default projectSlice.reducer