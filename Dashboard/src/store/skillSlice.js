import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
    name: "skill",
    initialState: {
        loading: false,
        skills: [],
        error: null,
        message: null
    },
    reducers: {
        getAllSlillsRequest(state, action) {
            state.loading = true
        },
        getAllSlillsSuccess(state, action) {
            state.loading = false;
            state.skills = action.payload;
        },
        getAllSlillsFailed(state, action) {
            state.loading = false;
            state.error = action.payload
        },

        deleteSkillRequest(state, action) {
            state.loading = true
        },
        deleteSkillSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
        },
        deleteSkillFailed(state, action) {
            state.loading = false;
            state.error = action.payload
        },

        addSkillRequest(state, action) {
            state.loading = true
        },
        addSkillSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
            state.skills = action.payload.skill;
        },
        addSkillFailed(state, action) {
            state.loading = false;
            state.error = action.payload
        },

        resetSkillSlice(state, action) {
            state.error = null;
            state.message = null;
            state.loading = null
        },

        clearSkillErrors(state, action) {
            state.error = null;
        },
    }
})

export const getAllSkills = () => async (dispatch) => {
    dispatch(skillSlice.actions.getAllSlillsRequest());
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-skill`);
        dispatch(skillSlice.actions.getAllSlillsSuccess(data.skills));
        dispatch(skillSlice.actions.clearSkillErrors());
    } catch (error) {
        dispatch(skillSlice.actions.getAllSlillsFailed(error.response.data.message))
    }
}

export const addSkill = (title, proficiency, svg) => async (dispatch) => {
    dispatch(skillSlice.actions.addSkillRequest());
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("proficiency", proficiency);
        formData.append("svg", svg);
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/skill-add`,
            formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        dispatch(skillSlice.actions.addSkillSuccess({
            skill: data.addedSkill,
            message: data.message
        }));
        dispatch(skillSlice.actions.clearSkillErrors());
    } catch (error) {
        dispatch(skillSlice.actions.addSkillFailed(error.response.data.message))
    }
}

export const deleteSkill = (_id) => async (dispatch) => {
    dispatch(skillSlice.actions.deleteSkillRequest());
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/skill-delete/${_id}`, { withCredentials: true });
        dispatch(skillSlice.actions.deleteSkillSuccess(data.message));
        dispatch(skillSlice.actions.clearSkillErrors());
    } catch (error) {
        dispatch(skillSlice.actions.deleteSkillFailed(error.response.data.message));
    }
}

export const clearAllSkillSliceErrors = () => (dispatch) => {
    dispatch(skillSlice.actions.clearSkillErrors())
}

export const resetSkillSliceErrors = () => (dispatch) => {
    dispatch(skillSlice.actions.resetSkillSlice())
}



export default skillSlice.reducer