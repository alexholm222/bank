import { useSelector } from 'react-redux';

import { companies, mockReceivers } from 'mock/mockData';

import CompanyFilter from 'components/Filters/CompanyFilter/CompanyFilter';
import ClearFiltersBtn from 'components/Filters/COMPONENTS/ClearAllBtn/ClearFiltersBtn';
import DateFilter from 'components/Filters/DateFilter/DateFilter';
import PayerFilter from 'components/Filters/PayerFilter/PayerFilter';
import ReceiverFilter from 'components/Filters/ReceiverFilter/ReceiverFilter';
import StatusFilter from 'components/Filters/StatusFilter/StatusFilter';
import TypeFilter from 'components/Filters/TypeFilter/TypeFilters';

import s from './FiltersContainer.module.scss';

import { isAnyFilterActive } from '../../redux/filters/selectors';
import ActivityFilter from './ActivityFilter/ActivityFilter';

const FiltersContainer = ({ type }) => {
  const hasFilters = useSelector(isAnyFilterActive);
  const filtersMap = {
    1: [
      <CompanyFilter key="company" />,
      <ReceiverFilter key="receiver" data={mockReceivers} />,
      <PayerFilter key="payer" data={mockReceivers} />,
      <TypeFilter key="type" />,
      <DateFilter key="date" />,
    ],
    2: [<CompanyFilter key="company" data={companies} />, <StatusFilter key="status" />],
    3: [
      <CompanyFilter key="company" data={companies} />,
      <ActivityFilter key="activity" />,
      <DateFilter key="date" />,
    ],
  };

  return (
    <div className={s.filters}>
      {hasFilters && <ClearFiltersBtn animation={hasFilters} />}
      {filtersMap[type] || null}
    </div>
  );
};
export default FiltersContainer;
