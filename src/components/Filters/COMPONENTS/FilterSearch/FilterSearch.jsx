import { useEffect, useState } from 'react';

import { ReactComponent as IconCloseGrey } from 'assets/icons/iconCloseGrey.svg';
import { ReactComponent as IconSearch } from 'assets/icons/iconSearch.svg';

import s from './FilterSearch.module.scss';

const handleSearchReceivers = (query, items) => {
  const value = query.toLowerCase();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(value) ||
      item.inn.includes(value) ||
      item.kpp?.includes(value) ||
      item.ogrnip?.includes(value)
  );
};

const FilterSearch = ({ items, onFilter, isOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtered, setFiltered] = useState(items);
  const handleSearch = (e) => {
    const value = e.currentTarget.value;
    setSearchQuery(value);

    const result = handleSearchReceivers(value, items);
    setFiltered(result);
    onFilter(result);
  };
  const handleClear = () => {
    setSearchQuery('');
    setFiltered(items);
    onFilter(items);
  };

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setFiltered(items);
      onFilter(items);
    }
  }, [isOpen]);

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
      {searchQuery && filtered.length === 0 && (
        <div className={s.empty}>{`Ничего не найдено по запросу "${searchQuery}"`}</div>
      )}
    </>
  );
};

export default FilterSearch;
