import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactionTypeFilter: 'all',
  transactionViewFilter: 'all',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setTransactionTypeFilter: (state, action) => {
      state.transactionTypeFilter = action.payload;
    },
    setTransactionViewFilter: (state, action) => {
      state.transactionViewFilter = action.payload;
    },
  },
});

export const { setTransactionTypeFilter, setTransactionViewFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
