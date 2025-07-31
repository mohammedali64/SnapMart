import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteOrderHistory, fetchOrders, placeOrder } from "../../Services/orderApiServices";

export const orderPlace = createAsyncThunk("/orders", async (order) => {
  await placeOrder(order);
});

export const ordersFetch = createAsyncThunk("orders/fetch", async () => {
  const response = await fetchOrders();
  console.log(response);
  return response;
});

export const orderHistoryDelete = createAsyncThunk("orders/uid/id",async(id)=>{
    await deleteOrderHistory(id);
    return id;
})

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [], 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderPlace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderPlace.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(orderPlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(ordersFetch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ordersFetch.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(ordersFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(orderHistoryDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderHistoryDelete.fulfilled, (state,action) => {
        const updatedOrderHistory = state.orders.filter((order)=>order.id !== action.payload);
        state.orders = updatedOrderHistory;
        state.loading = false;
      })
      .addCase(orderHistoryDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default orderSlice.reducer;
