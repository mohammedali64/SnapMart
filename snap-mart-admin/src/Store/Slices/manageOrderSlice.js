import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllOrders, updateOrderStatus } from "../../Services/orderApiServices";

export const adminFetchOrders = createAsyncThunk("admin/orders/fetch", async () => {
  return await fetchAllOrders();
});

export const adminUpdateOrderStatus = createAsyncThunk(
  "admin/orders/updateStatus",
  async ({ userId, orderId, status }) => {
    await updateOrderStatus(userId, orderId, status);
    return { orderId, status };
  }
);

const manageOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
       },
    },
  extraReducers: (builder) => {
    builder
      .addCase(adminFetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminFetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(adminFetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(adminUpdateOrderStatus.fulfilled, (state, action) => {
        const order = state.orders.find((o) => o.id === action.payload.orderId);
        if (order) order.status = action.payload.status;
      });
  },
});

export const {setOrders} = manageOrderSlice.actions;
export default manageOrderSlice.reducer;
