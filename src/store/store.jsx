import { configureStore } from "@reduxjs/toolkit";
import coffeeReducer from "../slices/coffeeSlice";
import beansReducer from "../slices/beanSlice";
import cartReducer from "../slices/cartSlice";
import favReducer from "../slices/favSlice";
import orderReducer from "../slices/orderSlice";
import authReducer from "../slices/authSlice"

export const store = configureStore({
    reducer: {
        coffee: coffeeReducer,
        beans: beansReducer,
        cart: cartReducer,
        fav: favReducer,
        orders: orderReducer,
        auth: authReducer,
    }
});