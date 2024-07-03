import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { keysForUpdate, numberOfTable } = action.payload;

      if (state.cart[numberOfTable]) {
        console.log(keysForUpdate);
        Object.keys(keysForUpdate).forEach((key) => {
          if (state.cart[numberOfTable][key]) {
            state.cart[numberOfTable][key] += keysForUpdate[key];
          } else {
            state.cart[numberOfTable][key] = keysForUpdate[key];
          }
        });
      } else {
        console.log(2);
        state.cart[numberOfTable] = keysForUpdate;
      }
    },

    setPurchaseNumber: (state, action) => {
      state.purchaseNumber = action.payload;
    },

    setFinalProfit: (state, action) => {
      state.finalProfit = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, setPurchaseNumber, setFinalProfit } =
  cartSlice.actions;
