
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getUserProfile = createAsyncThunk(
    "user/getUserProfile",
    async (body,thunkAPI) => {
        try {
            const response = await axiosClient.post("/user/getUserProfile",body);
            console.log('user profile',response);
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);



const postSlice = createSlice({
    name: "postSlice",
    initialState: {
       userProfile:{}
    },
   
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload;
        })
           
    },
});

export default postSlice.reducer;





