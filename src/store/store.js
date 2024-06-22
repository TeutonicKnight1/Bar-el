import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import menuSlice from "./menuSlice";
import counterSlice from "./counterSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    menu: menuSlice,
    counter: counterSlice,
  },
});
