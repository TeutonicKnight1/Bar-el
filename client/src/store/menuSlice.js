import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMenu } from '../axios/axios';

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
  const response = await getMenu();
  let data = {};
  response.forEach((item) => {
    data[item.name] = item;
  });
  return data;
});

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setNetPrices: (state, action) => {
      state.netPrices = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;
export const { setPrices, setNetPrices } = menuSlice.actions;
