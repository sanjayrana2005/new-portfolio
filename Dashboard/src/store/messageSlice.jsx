import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
    name: "messages",
    initialState: {
        loading: false,
        messages: [],
        error: null,
        toastMessage: null
    },
    reducers: {
        getAllMessagesRequests(state, action) {
            state.loading = true
        },
        getAllMessagesSuccess(state, action) {
            state.loading = false;
            state.messages = action.payload;
        },
        getAllMessagesFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        deleteMessageRequests(state, action) {
            state.loading = true
        },
        deleteMessageSuccess(state, action) {
            state.loading = false;
            state.toastMessage = action.payload;
        },
        deleteMessageFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        resetMessageSlice(state, action) {
            state.error = null,
            state.messages=state.messages,
            state.toastMessage=null,
            state.loading=null
        },
        clearAllMessagesError(state, action) {
            state.error = null
        }
    }
})

export const getAllMessages = () => async (dispatch) => {
    dispatch(messageSlice.actions.getAllMessagesRequests())
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/get-message`, {
            withCredentials: true
        })
        dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages))
        dispatch(messageSlice.actions.clearAllMessagesError())
    } catch (error) {
        dispatch(messageSlice.actions.getAllMessagesFailed(error.responce.data.message));
    }
}

export const deleteMessage = (_id) => async (dispatch) => {
    dispatch(messageSlice.actions.deleteMessageRequests())
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_BASE_URL}/delete-message/${_id}`, {
            withCredentials: true
        });
        dispatch(messageSlice.actions.deleteMessageSuccess(data.message))
        dispatch(messageSlice.actions.clearAllMessagesError())
    } catch (error) {
        dispatch(messageSlice.actions.deleteMessageFailed(error.response.data.message))
    }
}

export const clearAllMessagesSliceError = () => (dispatch)=>{
    dispatch(messageSlice.actions.clearAllMessagesError())
}

export const resetMessageSlice = () => (dispatch)=>{
    dispatch(messageSlice.actions.resetMessageSlice())
}


export default messageSlice.reducer