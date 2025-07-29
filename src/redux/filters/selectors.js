import { createSelector } from '@reduxjs/toolkit';

export const isAnyFilterActive = (state) => {
  const { dateStartPicker, dateEndPicker } = state.dateRange;
  const {
    transactionTypeFilter,
    transactionViewFilter,
    selectedCompanies,
    selectedPartnerships,
    selectedStatus,
    selectedActivity,
    selectedRecognizedType,
  } = state.filters;

  return (
    transactionTypeFilter.length > 0 ||
    transactionViewFilter !== null ||
    selectedCompanies.length > 0 ||
    selectedPartnerships.length > 0 ||
    (dateStartPicker && dateEndPicker) ||
    selectedStatus !== '' ||
    selectedActivity !== null ||
    selectedRecognizedType !== ''
  );
};

export const selectSelectedActivity = createSelector(
  (state) => state.filters.selectedActivity,
  (selected) => selected || []
);
