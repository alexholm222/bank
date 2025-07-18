import formatDate from '../formatDate';
import arrayToString from '../arrayToString';

const getTransactionsParams = (
  searchQuery,
  dateStart,
  dateEnd,
  typeFilter,
  viewFilter,
  isUnknownTransaction
) => {
  return {
    'filter[search]': searchQuery,
    'filter[date_start]': formatDate(dateStart),
    'filter[date_end]': formatDate(dateEnd),
    'filter[partnership_ids]': '',
    'filter[company_ids]': '',
    'filter[kind]': arrayToString(viewFilter) || '',
    'filter[type]': arrayToString(typeFilter) || '',
    'filter[requires_action]': isUnknownTransaction ? '1' : '',
  };
};

export default getTransactionsParams;
