import { createSlice } from '@reduxjs/toolkit';

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

const initialState = {
  dateStart: '',
  dateEnd: '',
  dateStartPicker: null,
  dateEndPicker: null,
};

const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState,
  reducers: {
    setDateStart(state, action) {
      state.dateStart = action.payload || '';
    },
    setDateEnd(state, action) {
      state.dateEnd = action.payload || '';
    },
    setDateStartPicker(state, action) {
      state.dateStartPicker = action.payload || null;
    },
    setDateEndPicker(state, action) {
      state.dateEndPicker = action.payload || null;
    },

    setDateRange(state, action) {
      const { start, end } = action.payload || {};
      state.dateStart = formatDate(start);
      state.dateEnd = formatDate(end);
      state.dateStartPicker = start || null;
      state.dateEndPicker = end || null;
    },
    resetDateRange(state) {
      state.dateStart = '';
      state.dateEnd = '';
      state.dateStartPicker = null;
      state.dateEndPicker = null;
    },
  },
});

export const {
  setDateStart,
  setDateEnd,
  setDateStartPicker,
  setDateEndPicker,
  setDateRange,
  resetDateRange,
} = dateRangeSlice.actions;

export default dateRangeSlice.reducer;
