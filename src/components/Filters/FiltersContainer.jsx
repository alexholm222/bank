import { useSelector } from 'react-redux';

import { companies, mockReceivers } from 'mock/mockData';

import CompanyFilter from 'components/Filters/CompanyFilter/CompanyFilter';
import ResetFiltersBtn from 'components/Filters/COMPONENTS/ResetFiltersAllBtn/ResetFiltersBtn';
import DateFilter from 'components/Filters/DateFilter/DateFilter';
import PayerFilter from 'components/Filters/PayerFilter/PayerFilter';
import ReceiverFilter from 'components/Filters/ReceiverFilter/ReceiverFilter';
import StatusFilter from 'components/Filters/StatusFilter/StatusFilter';
import TypeFilter from 'components/Filters/TypeFilter/TypeFilters';

import s from './FiltersContainer.module.scss';

import { isAnyFilterActive } from '../../redux/filters/selectors';
import ActivityFilter from './ActivityFilter/ActivityFilter';
import { useState } from 'react';

const FiltersContainer = ({ type, isFetching }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const hasFilters = useSelector(isAnyFilterActive);

  const clearActiveFilter = () => setActiveFilter(null);

  const getFetching = (name) => (activeFilter === name ? isFetching : false);
  const filtersMap = {
    transactions: [
      <CompanyFilter
        key="company"
        name="company"
        isFetching={getFetching('company')}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        clearActiveFilter={clearActiveFilter}
      />,
      <ReceiverFilter
        key="receiver"
        name="receiver"
        isFetching={getFetching('receiver')}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        clearActiveFilter={clearActiveFilter}
      />,
      <PayerFilter
        key="payer"
        name="payer"
        isFetching={getFetching('payer')}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        clearActiveFilter={clearActiveFilter}
        data={mockReceivers}
      />,
      <TypeFilter
        key="type"
        name="type"
        isFetching={getFetching('type')}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        clearActiveFilter={clearActiveFilter}
      />,
      <DateFilter
        key="date"
        name="date"
        isFetching={getFetching('date')}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        clearActiveFilter={clearActiveFilter}
      />,
    ],
    extractions: [
      <CompanyFilter
        key="company"
        data={companies}
        isFetching={getFetching('company')}
        activeFilter={activeFilter}
        setActiveFilter={() => setActiveFilter('company')}
      />,
      <StatusFilter
        key="status"
        isFetching={getFetching('status')}
        activeFilter={activeFilter}
        setActiveFilter={() => setActiveFilter('status')}
      />,
    ],
    accounts: [
      <CompanyFilter
        key="company"
        data={companies}
        isFetching={getFetching('company')}
        activeFilter={activeFilter}
        setActiveFilter={() => setActiveFilter('company')}
      />,
      <ActivityFilter
        key="activity"
        isFetching={getFetching('activity')}
        activeFilter={activeFilter}
        setActiveFilter={() => setActiveFilter('activity')}
      />,
      <DateFilter
        key="date"
        isFetching={getFetching('date')}
        activeFilter={activeFilter}
        setActiveFilter={() => setActiveFilter('date')}
      />,
    ],
  };

  return (
    <div className={s.filters}>
      {hasFilters && (
        <ResetFiltersBtn
          animation={hasFilters}
          onClear={() => {
            setActiveFilter(null);
          }}
        />
      )}
      {filtersMap[type] || null}
    </div>
  );
};
export default FiltersContainer;
