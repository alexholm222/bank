export const isAnyFilterActive = (state) => {
  const { dateStartPicker, dateEndPicker } = state.dateRange;
  const {
    transactionTypeFilter,
    transactionViewFilter,
    selectedCompanies,
    selectedReceivers,
    selectedPayers,
    selectedStatus,
    selectedActivity,
  } = state.filters;

  return (
    transactionTypeFilter !== null ||
    transactionViewFilter !== null ||
    selectedCompanies.length > 0 ||
    selectedReceivers.length > 0 ||
    selectedPayers.length > 0 ||
    (dateStartPicker && dateEndPicker) ||
    selectedStatus !== null ||
    selectedActivity !== null
  );
};
