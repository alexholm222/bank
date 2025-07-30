import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactionTypeFilter: [],
  transactionViewFilter: null,
  selectedStatus: '',
  selectedCompanies: [],
  selectedPartnerships: [],
  selectedActivity: null,
  selectedRecognizedType: '',
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
    setSelectedPartnerships(state, action) {
      state.selectedPartnerships = action.payload;
    },
    setSelectedStatus(state, action) {
      state.selectedStatus = action.payload;
    },
    setSelectedActivity(state, action) {
      state.selectedActivity = action.payload;
    },
    setSelectedRecognizedType(state, action) {
      state.selectedRecognizedType = action.payload;
    },
    resetAllFilters: () => initialState,
  },
});

export const {
  setTransactionTypeFilter,
  setTransactionViewFilter,
  setSelectedCompanies,
  setSelectedReceivers,
  setSelectedPartnerships,
  setSelectedStatus,
  setSelectedActivity,
  resetAllFilters,
  setSelectedRecognizedType,
} = filtersSlice.actions;

export default filtersSlice.reducer;
