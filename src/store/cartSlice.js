import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {},
  purchaseNumber: 0,
  finalProfit: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { keysForUpdate } = action.payload;

      Object.keys(keysForUpdate).forEach((key) => {
        if(state.cart[key]) {
          state.cart[key] = keysForUpdate[key];
        }
      })
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
