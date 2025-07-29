import formatDate from '../formatDate';
import arrayToString from '../arrayToString';

const getExtractionsParams = ({
  searchQuery,
  dateStartPicker,
  dateEndPicker,
  selectedPartnerships,
  selectedStatus,
}) => {
  console.log(selectedStatus);
  let status = '';
  if (selectedStatus === 'recognized') status = '1';
  if (selectedStatus === 'unrecognized') status = '0';
  console.log(status);
  return {
    'filter[search]': searchQuery,
    'filter[date_start]': formatDate(dateStartPicker),
    'filter[date_end]': formatDate(dateEndPicker),
    'filter[partnership_details]': arrayToString(selectedPartnerships) || '',
    'filter[status]': status,
  };
};

export default getExtractionsParams;
