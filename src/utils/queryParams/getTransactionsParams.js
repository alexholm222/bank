import formatDate from '../formatDate';
import arrayToString from '../arrayToString';

const getTransactionsParams = ({
  searchQuery,
  dateStartPicker,
  dateEndPicker,
  transactionViewFilter,
  selectedRecognizedType,
  selectedPartnerships,
  selectedCompanies,
  transactionTypeFilter,
}) => {
  return {
    'filter[search]': searchQuery,
    'filter[date_start]': formatDate(dateStartPicker),
    'filter[date_end]': formatDate(dateEndPicker),
    'filter[partnership_details]': arrayToString(selectedPartnerships) || '',
    'filter[company_ids]': arrayToString(selectedCompanies) || '',
    'filter[kind]': arrayToString(transactionViewFilter) || '',
    'filter[type]': arrayToString(transactionTypeFilter) || '',
    'filter[requires_action]': selectedRecognizedType || '',
  };
};

export default getTransactionsParams;
