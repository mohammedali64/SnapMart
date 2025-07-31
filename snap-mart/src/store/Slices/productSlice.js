import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../../Services/productApiService";


export const fetchProducts = createAsyncThunk("products/fetchProducts",async()=>{
    const data = await getAllProducts();
    return data;
})


const productSlice = createSlice({
    name:'products',
    initialState:{
        items:[],
        loading:false,
        error:null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }

})
export default productSlice.reducer;