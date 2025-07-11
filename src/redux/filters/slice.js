import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactionTypeFilter: '',
  transactionViewFilter: '',
  selectedStatus: 'all',
  selectedCompanies: [],
  selectedReceivers: [],
  selectedPayers: [],
  selectedActivity: 'active',
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
    setSelectedStatus(state, action) {
      state.selectedStatus = action.payload;
    },
    setSelectedActivity(state, action) {
      state.selectedActivity = action.payload;
    },
  },
});

export const {
  setTransactionTypeFilter,
  setTransactionViewFilter,
  setSelectedCompanies,
  setSelectedReceivers,
  setSelectedPayers,
  setSelectedStatus,
  setSelectedActivity,
} = filtersSlice.actions;

export default filtersSlice.reducer;
