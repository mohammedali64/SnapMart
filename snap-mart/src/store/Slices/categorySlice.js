import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "../../Services/productApiService";

export const getCategories = createAsyncThunk("products/categories",async()=>{
    const response = await getAllCategories();
    return response;
})


const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        selectedCategory: null,
        loading: false,
        error: null
    },
    reducers: {
        selectCategory(state, action) {
            state.selectedCategory = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(getCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})
export const { selectCategory } = categorySlice.actions;
export default categorySlice.reducer;