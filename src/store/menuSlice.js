import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prices: {
    bar: {
      beer: {
        Cheshskoe: 150,
        Blanch: 190,
      },
      snacks: {
        Chips: 115,
        SucharikiSouce: 75,
        Suchariki: 50,
      },
    },
    kitchen: {
      setOnTwo: 400,
      setOnFour: 600,
      setOnSix: 1000,
    },
  },
  netPrices: {
    bar: {
      beer: {
        Cheshskoe: 100,
        Blanch: 120,
      },
      snacks: {
        Chips: 75,
        SucharikiSouce: 40,
        Suchariki: 25,
      },
    },
    kitchen: {
      setOnTwo: 200,
      setOnFour: 350,
      setOnSix: 600,
    },
  },
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
