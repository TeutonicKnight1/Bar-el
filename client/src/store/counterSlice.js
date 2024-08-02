import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  points: {},
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    nullification: (state) => {
      state.points = {};
    },

    increment: (state, action) => {
      const pointKey = action.payload.key;
      console.log(pointKey);

      if (state.points[pointKey]) {
        state.points[pointKey] = state.points[pointKey] + 1;
      } else {
        state.points = {
          ...state.points,
          [pointKey]: 1,
        };
      }
    },

    decrement: (state, action) => {
      const pointKey = action.payload.key;
      state.points = {
        ...state.points,
        [pointKey]: (state.points[pointKey] || 0) - 1,
      };
    },
  },
});

export default counterSlice.reducer;
export const { increment, decrement, nullification } = counterSlice.actions;
