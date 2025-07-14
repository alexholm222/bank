export const isAnyFilterActive = (state) => {
  const { dateStartPicker, dateEndPicker } = state.dateRange;
  const {
    transactionTypeFilter,
    transactionViewFilter,
    selectedCompanies,
    selectedReceivers,
    selectedPayers,
    selectedStatus,
  } = state.filters;
  return (
    transactionTypeFilter !== '' ||
    transactionViewFilter !== '' ||
    selectedCompanies.length > 0 ||
    selectedReceivers.length > 0 ||
    selectedPayers.length > 0 ||
    (dateStartPicker && dateEndPicker) ||
    selectedStatus !== 'all'
  );
};
