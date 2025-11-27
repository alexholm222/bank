import { createSlice } from '@reduxjs/toolkit';

const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState: {
    dateStartPicker: null,
    dateEndPicker: null,
  },
  reducers: {
    setDateStartPicker: (state, action) => {
      state.dateStartPicker = action.payload;
    },
    setDateEndPicker: (state, action) => {
      state.dateEndPicker = action.payload;
    },
    resetAllDates: (state) => {
      state.dateStartPicker = null;
      state.dateEndPicker = null;
    },
  },
});

export const { setDateStartPicker, setDateEndPicker, resetAllDates } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;
