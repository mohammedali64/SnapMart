import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Slices/productSlice";
import categoryReducer from "./Slices/categorySlice";
import manageOrderReducer from "./Slices/manageOrderSlice"

const store = configureStore({
    reducer:{
        products: productsReducer,
        categories: categoryReducer,
        orders: manageOrderReducer,
    }
})

export default store;