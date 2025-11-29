import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
    name: "timline",
    initialState: {
        loading: false,
        timeline: [],
        error: null,
        message: null
    },
    reducers: {
        getAlltimelineRequest(state, action) {
            state.loading = true
        },
        getAlltimelineSuccess(state, action) {
            state.loading = false;
            state.timeline = action.payload;
        },
        getAlltimelineFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        deleteTimelineRequest(state, action) {
            state.loading = true
        },
        deleteTimelineSuccess(state, action) {
            state.loading = false;
            state.message = action.payload;
        },
        deleteTimelineFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        addTimelineRequest(state, action) {
            state.loading = true
        },
        addTimelineSuccess(state, action) {
            state.loading = false;
            state.timeline = action.payload.timeline;
            state.message = action.payload.message;
        },
        addTimelineFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        resetTimelineSlice(state, action) {
            state.error = null,
                state.message = null,
                state.loading = null
        },

        clearAllTimelineError(state, action) {
            state.error = null
        }
    }
})

export const getAllTimeline = () => async (dispatch) => {
    dispatch(timelineSlice.actions.getAlltimelineRequest())
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/timeline/get-timeline`, {
            withCredentials: true
        })
        dispatch(timelineSlice.actions.getAlltimelineSuccess(data.timeline))
        dispatch(timelineSlice.actions.clearAllTimelineError())
    } catch (error) {
        dispatch(timelineSlice.actions.getAlltimelineFailed(error.responce.data.message));
    }
}

export const deleteTimeline = (_id) => async (dispatch) => {
    dispatch(timelineSlice.actions.deleteTimelineRequest())
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/timeline/delete/${_id}`, {
            withCredentials: true
        });
        dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message))
        dispatch(timelineSlice.actions.clearAllTimelineError())
    } catch (error) {
        dispatch(timelineSlice.actions.deleteTimelineFailed(error.response.data.message))
    }
}

export const addTimeline = (title,description,from,to) => async (dispatch) => {
    dispatch(timelineSlice.actions.addTimelineRequest())
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/timeline/add`,{title,description,from,to}, {
            withCredentials: true,
            headers:{
                "content-Type":"application/json"
            }
        });
        dispatch(timelineSlice.actions.addTimelineSuccess({
            timeline: data.timeline,
            message: data.message
        }
        ))
        dispatch(timelineSlice.actions.clearAllTimelineError())
    } catch (error) {
        dispatch(timelineSlice.actions.addTimelineFailed(error.response.data.message))
    }
}

export const clearAllTimelineSliceError = () => (dispatch) => {
    dispatch(timelineSlice.actions.clearAllTimelineError())
}

export const resetTimelineSlice = () => (dispatch) => {
    dispatch(timelineSlice.actions.resetTimelineSlice())
}


export default timelineSlice.reducer