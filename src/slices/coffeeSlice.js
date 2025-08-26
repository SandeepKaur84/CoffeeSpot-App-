import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCoffeeData } from "../api/Coffee";

export const fetchCoffees = createAsyncThunk('coffee/fetchCoffees', async() => {
    try {
        const data = await getCoffeeData();
        console.log("Fetched Coffee Data:", data);
        return data;
    } catch(err) {
        console.log("Something happened", err);
    }
});

const coffeeSlice = createSlice({
    name: 'coffee',
    initialState: {
        coffeeList: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCoffees.pending, state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCoffees.fulfilled, (state, action) => {
            state.loading = false;
            state.coffeeList = action.payload;
        })
        .addCase(fetchCoffees.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default coffeeSlice.reducer;