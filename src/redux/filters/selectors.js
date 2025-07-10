export const isAnyFilterActive = (state) => {
  const { dateStart, dateEnd } = state.dateRange;
  const {
    transactionTypeFilter,
    transactionViewFilter,
    selectedCompanies,
    selectedReceivers,
    selectedPayers,
  } = state.filters;
  return (
    transactionTypeFilter !== 'all' ||
    transactionViewFilter !== 'all' ||
    selectedCompanies.length > 0 ||
    selectedReceivers.length > 0 ||
    selectedPayers.length > 0 ||
    dateStart ||
    dateEnd
  );
};
