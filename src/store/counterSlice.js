import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  points: {},
};

const countSlice = [
  {
    name: "Cheshskoe",
    price: 150,
    type: "Beer",
    initialState,
  },
];

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    nullification: (state) => {
      if (state.points.length > 0) {
        state.points.forEach((point) => {
          point.value = 0;
        });
      }
    },

    increment: (state, action) => {
      const pointKey = action.payload.key;

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

      if (state.points[pointKey]) {
        state.points[pointKey] = state.points[pointKey] - 1;
      } else {
        state.points = {
          ...state.points,
          [pointKey]: 1,
        };
      }
    },
  },
});

export default counterSlice.reducer;
export const { increment, decrement, nullification } = counterSlice.actions;
