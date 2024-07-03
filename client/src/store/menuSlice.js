import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prices: {},
  netPrices: {},
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setNetPrices: (state, action) => {
      state.netPrices = action.payload;
    },
  },
});

export default menuSlice.reducer;
export const { setPrices, setNetPrices } = menuSlice.actions;
