import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Cheshskoe: 0,
  Blanch: 0,
  Chips: 0,
  SucharikiSouce: 0,
  Suchariki: 0,
  setOnTwo: 0,
  setOnFour: 0,
  setOnSix: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    nullification: (state) => {
      state.Cheshskoe = 0;
      state.Blanch = 0;
      state.Chips = 0;
      state.SucharikiSouce = 0;
      state.Suchariki = 0;
      state.setOnTwo = 0;
      state.setOnFour = 0;
      state.setOnSix = 0;
    },

    increment: (state, action) => {
      state.value += action.payload;
    },

    decrement: (state, action) => {
      state.value -= action.payload;
    },
  },
});

export default counterSlice.reducer;
export const { increment, decrement, nullification } = counterSlice.actions;
