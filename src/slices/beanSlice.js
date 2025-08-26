import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBeansData } from "../api/Beans";

export const fetchBeans = createAsyncThunk('beans/fetchBeans', async() => {
    try {
        const data = getBeansData();
        console.log("Fetched Beans Data: ", data);
        return data; 
    } catch(err) {
        console.log("Something happened", err);
    }
});

const beanSlice = createSlice({
    name: 'beans',
    initialState: {
        beansList: [],
        loading: false,
        error: null,
    },
    extraReducers: builder => {
        builder
        .addCase(fetchBeans.pending, state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchBeans.fulfilled, (state, action) => {
            state.loading = false;
            state.beansList = action.payload;
        })
        .addCase(fetchBeans.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default beanSlice.reducer;