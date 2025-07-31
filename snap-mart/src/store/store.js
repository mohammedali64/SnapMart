import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slices/productSlice"
import categoryReducer from "./Slices/categorySlice";
import cartReducer from "./Slices/cartSlice";
import orderReducer from "./Slices/orderSlice"


const store = configureStore({
    reducer:{
        product:productReducer,
        category:categoryReducer,
        cart:cartReducer,
        orders: orderReducer,
    }
})

export default store;