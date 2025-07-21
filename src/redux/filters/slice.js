import { createSlice } from '@reduxjs/toolkit';
import { set } from 'lodash';

const initialState = {
  transactionTypeFilter: null,
  transactionViewFilter: null,
  selectedStatus: null,
  selectedCompanies: [],
  selectedReceivers: [],
  selectedPayers: [],
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
  setSelectedPayers,
  setSelectedStatus,
  setSelectedActivity,
  resetAllFilters,
  setSelectedRecognizedType,
} = filtersSlice.actions;

export default filtersSlice.reducer;
