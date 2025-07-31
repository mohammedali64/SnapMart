import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteItem, deleteUserCart, fetchCart, increment } from "../../Services/cartApiServices";


export const addCart = createAsyncThunk("/cart", async (product) => {
  await addToCart(product);
  return product;
});

export const cartFetch = createAsyncThunk("/fetchCart", async () => {
  const response = await fetchCart();
  return response;
});

export const incrementQuantity = createAsyncThunk('/increment', async (item) => {
  await increment(item);
  return item;
});

export const decrementQuantity = createAsyncThunk('/decrement', async (item) => {
  await increment(item);
  return item;
});

export const removeFromCart = createAsyncThunk('/remove', async (item) => {
  await deleteItem(item)
  return item;
});

export const userCartDelete = createAsyncThunk("/cart/user/uid",async()=>{
    await deleteUserCart();
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    loading: false,
    error: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
        state.loading = false;
      })
      .addCase(addCart.rejected, (state) => {
        state.loading = false;
        state.error = 'Error adding product to cart';
      })
      .addCase(cartFetch.pending, (state) => {
        state.loading = true;
      })
      .addCase(cartFetch.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(cartFetch.rejected, (state) => {
        state.loading = false;
        state.error = 'Error fetching cart';
      })
      .addCase(incrementQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(incrementQuantity.fulfilled, (state, action) => {
        const index = state.cart.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.cart[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(incrementQuantity.rejected, (state) => {
        state.loading = false;
        state.error = 'Error incrementing quantity';
      })
      .addCase(decrementQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(decrementQuantity.fulfilled, (state, action) => {
        const index = state.cart.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.cart[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(decrementQuantity.rejected, (state) => {
        state.loading = false;
        state.error = 'Error decrementing quantity';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      })
      .addCase(userCartDelete.fulfilled,(state)=>{
        state.cart = [];
      })
  }
});

export const { incrementLocalQuantity } = cartSlice.actions;
export default cartSlice.reducer;