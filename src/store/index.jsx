import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartRedux";
import uiSlice from "./uiRedux";

const store = configureStore({
    reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;