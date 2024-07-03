import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
};

const activeOrdersSlice = createSlice({
    name: "activeOrders",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders = [...state.orders, action.payload];
        },
    },
});

export default activeOrdersSlice.reducer;
export const { addOrder } = activeOrdersSlice.actions;