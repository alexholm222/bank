import { useState } from 'react';
// redux
import { useSelector } from 'react-redux';
import { isAnyFilterActive } from '../../redux/filters/selectors';

// mock
import { companies } from 'mock/mockData';

// components
import ActivityFilter from './ActivityFilter/ActivityFilter';
import DetailsFilter from 'components/Filters/DetailsFilter/DetailsFilter';
import ResetFiltersBtn from 'components/Filters/COMPONENTS/ResetFiltersAllBtn/ResetFiltersBtn';
import DateFilter from 'components/Filters/DateFilter/DateFilter';
import PayerFilter from 'components/Filters/PayerFilter/PayerFilter';
import CompanyFilter from 'components/Filters/CompanyFilter/CompanyFilter';
import StatusFilter from 'components/Filters/StatusFilter/StatusFilter';
import TypeFilter from 'components/Filters/TypeFilter/TypeFilters';

// styles
import s from './FiltersContainer.module.scss';

const FiltersContainer = ({ type, isFetching }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const hasFilters = useSelector(isAnyFilterActive);

  const clearActiveFilter = () => setActiveFilter(null);

  const getFetching = (name) => (activeFilter === name ? isFetching : false);

  const filtersMap = {
    transactions: [
      <DetailsFilter
        key="details"
        name="details"
        isFetching={getFetching('details')}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        clearActiveFilter={clearActiveFilter}
      />,
      <CompanyFilter
        key="companies"
        name="companies"
        isFetching={getFetching('companies')}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        clearActiveFilter={clearActiveFilter}
      />,
      // <PayerFilter
      //   key="payer"
      //   name="payer"
      //   isFetching={getFetching('payer')}
      //   activeFilter={activeFilter}
      //   setActiveFilter={setActiveFilter}
      //   clearActiveFilter={clearActiveFilter}
      //   data={mockReceivers}
      // />,
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
      <DetailsFilter
        key="company"
        name="company"
        data={companies}
        isFetching={getFetching('company')}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        clearActiveFilter={clearActiveFilter}
      />,
      <StatusFilter
        name="status"
        key="status"
        isFetching={getFetching('status')}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        clearActiveFilter={clearActiveFilter}
      />,
    ],
    accounts: [
      <DetailsFilter
        key="company"
        name="company"
        data={companies}
        isFetching={getFetching('company')}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        clearActiveFilter={clearActiveFilter}
      />,
      <ActivityFilter
        key="activity"
        name="activity"
        isFetching={getFetching('activity')}
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
