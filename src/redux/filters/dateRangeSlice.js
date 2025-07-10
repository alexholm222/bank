import { createSlice } from '@reduxjs/toolkit';

const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState: {
    dateStart: '',
    dateEnd: '',
    dateStartPicker: null,
    dateEndPicker: null,
  },
  reducers: {
    setDateStart: (state, action) => {
      state.dateStart = action.payload;
    },
    setDateEnd: (state, action) => {
      state.dateEnd = action.payload;
    },
    setDateStartPicker: (state, action) => {
      state.dateStartPicker = action.payload;
    },
    setDateEndPicker: (state, action) => {
      state.dateEndPicker = action.payload;
    },
  },
});

export const { setDateStart, setDateEnd, setDateStartPicker, setDateEndPicker } =
  dateRangeSlice.actions;

export default dateRangeSlice.reducer;
