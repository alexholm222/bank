import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactionTypeFilter: 'all',
  transactionViewFilter: 'all',
  selectedCompanies: [],
  selectedReceivers: [],
  selectedPayers: [],
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
    setSelectedCompanies(state, action) {
      state.selectedCompanies = action.payload;
    },
    setSelectedReceivers(state, action) {
      state.selectedReceivers = action.payload;
    },
    setSelectedPayers(state, action) {
      state.selectedPayers = action.payload;
    },
  },
});

export const {
  setTransactionTypeFilter,
  setTransactionViewFilter,
  setSelectedCompanies,
  setSelectedReceivers,
  setSelectedPayers,
} = filtersSlice.actions;

export default filtersSlice.reducer;
