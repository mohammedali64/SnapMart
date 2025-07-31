import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProduct, deleteProduct, getProducts } from "../../Services/apiServices";


export const addProducts = createAsyncThunk("products/add",async(product)=>{
    const updatedProduct = await addProduct(product);
    console.log(updatedProduct);
    return updatedProduct;
});

export const fetchProducts = createAsyncThunk("products/all",async()=>{
    const products = await getProducts();
    return products;
})

export const deleteProducts = createAsyncThunk("products/delete",async(id)=>{
    await deleteProduct(id);
    return id;
})



const productsSlice = createSlice({
  name: "products",
  initialState: { items: [],categories:[], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addProducts.pending, (state) => { state.loading = true; })
    .addCase(addProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
    })
    .addCase(addProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    .addCase(fetchProducts.pending,(state)=>{state.loading = true;})
    .addCase(fetchProducts.fulfilled,(state,action)=>{
        state.loading = false;
        state.items = action.payload;
    })
    .addCase(fetchProducts.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.error.message;
    })
    .addCase(deleteProducts.pending,(state)=>{state.loading = true;})
    .addCase(deleteProducts.fulfilled,(state,action)=>{
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
    })
    .addCase(deleteProducts.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.error.message;
    })
  },
});

export default productsSlice.reducer;

