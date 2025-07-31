import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  addCategories, deleteCategori, fetchCategories } from "../../Services/apiServices";


export const addCategory = createAsyncThunk("addCategory",async(category)=>{
    const categories = await addCategories(category);
    console.log(categories);
    return categories;
})

export const getCategories = createAsyncThunk("category",async()=>{
    const categories = await fetchCategories();
    return categories;
})

export const deleteCategory = createAsyncThunk("deleteCategory",async(id)=>{
    await deleteCategori(id);
    return id;
})

const categorySlice = createSlice({
    name: "category",
    initialState:{
        categories: [],
        loading: false,
        error: null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(addCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addCategory.fulfilled, (state, action) => {
            state.loading = false;
            const updatedCategories = [...state.categories,action.payload]
            state.categories = updatedCategories;
        })
        .addCase(addCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        })
        .addCase(getCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(deleteCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload);
            state.categories = state.categories.filter(category => category.id !== action.payload);
        })
        .addCase(deleteCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }

});
export default categorySlice.reducer;
