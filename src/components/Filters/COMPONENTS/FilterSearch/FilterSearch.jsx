import { useState } from 'react';

import { ReactComponent as IconCloseGrey } from 'assets/icons/iconCloseGrey.svg';
import { ReactComponent as IconSearch } from 'assets/icons/iconSearch.svg';

import s from './FilterSearch.module.scss';

const handleSearchReceivers = (query, receivers) => {
  const value = query.toLowerCase();
  return receivers.filter(
    (receiver) =>
      receiver.name.toLowerCase().includes(value) ||
      receiver.inn.includes(value) ||
      receiver.kpp?.includes(value) ||
      receiver.ogrnip?.includes(value)
  );
};

const FilterSearch = ({ receivers, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.currentTarget.value;
    setSearchQuery(value);

    const result = handleSearchReceivers(value, receivers);
    onFilter(result);
  };

  const handleClear = () => {
    setSearchQuery('');
    onFilter(receivers);
  };

  return (
    <>
      <div className={s.search}>
        <IconSearch />
        <input onChange={handleSearch} value={searchQuery} type="text" placeholder="Поиск..." />
        {searchQuery && (
          <button
            className={s.clearButton}
            onClick={handleClear}
            type="button"
            aria-label="Очистить"
          >
            <IconCloseGrey />
          </button>
        )}
      </div>
      {searchQuery && (
        <div className={s.empty}>{`Ничего не найдено по запросу "${searchQuery}"`}</div>
      )}
    </>
  );
};

export default FilterSearch;
