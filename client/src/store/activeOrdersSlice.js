import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders } from "../axios/axios";

export const fetchOrders = createAsyncThunk("activeOrders/fetchOrders", async () => {
    const response = await getOrders();
    return response;
  });



const activeOrdersSlice = createSlice({
    name: "activeOrders",
    initialState: {
        orders: [],
    },
    reducers: {
        addOrder: (state, action) => {
            state.orders = [...state.orders, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchOrders.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchOrders.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.orders = action.payload;
          })
          .addCase(fetchOrders.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          });
      },
});

export default activeOrdersSlice.reducer;
export const { addOrder } = activeOrdersSlice.actions;