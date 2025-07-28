import formatDate from '../formatDate';
import arrayToString from '../arrayToString';

const getTransactionsParams = ({
  searchQuery,
  dateStart,
  dateEnd,

  transactionViewFilter,
  selectedRecognizedType,
  selectedPartnerships,
  selectedCompanies,
  transactionTypeFilter,
}) => {
  return {
    'filter[search]': searchQuery,
    'filter[date_start]': formatDate(dateStart),
    'filter[date_end]': formatDate(dateEnd),
    'filter[partnership_details]': arrayToString(selectedPartnerships) || '',
    'filter[company_ids]': arrayToString(selectedCompanies) || '',
    'filter[kind]': arrayToString(transactionViewFilter) || '',
    'filter[type]': arrayToString(transactionTypeFilter) || '',
    'filter[requires_action]': selectedRecognizedType || '',
  };
};

export default getTransactionsParams;
