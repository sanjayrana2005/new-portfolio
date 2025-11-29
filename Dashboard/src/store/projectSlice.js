import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name:"project",
    initialState:{
        loading:null,
        error:null,
        projects:[],
        message:null,
        },
        reducers:{

        }
})

export default projectSlice.reducer