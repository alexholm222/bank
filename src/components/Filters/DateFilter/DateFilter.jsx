import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setDateEndPicker, setDateStartPicker } from '../../../redux/filters/dateRangeSlice';

// Components
import { FilterButtonDate } from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import { DateMenu } from './DateMenu/DateMenu';
import { getTitleDateDuration } from './DateMenu/utils/date';
import { ReactComponent as IconCalendar } from 'assets/icons/iconCalendar.svg';

// Styles
import s from './DateFilter.module.scss';

const DateFilter = () => {
  const { dateStartPicker, dateEndPicker } = useSelector((state) => state.dateRange);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const isSelected = Boolean(dateStartPicker && dateEndPicker);
  const title = isSelected ? getTitleDateDuration(dateStartPicker, dateEndPicker) : 'Период';

  const handleOpen = () => setIsOpen(true);

  const handleReset = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setDateStartPicker(null));
    dispatch(setDateEndPicker(null));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !e.composedPath().includes(ref.current)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={s.root}>
      <div ref={ref} onClick={handleOpen} className={classNames(s.filter)}>
        <FilterButtonDate
          title={title}
          Icon={IconCalendar}
          isSelected={isSelected}
          handleReset={handleReset}
          handleOpen={handleOpen}
          buttonRef={ref}
        />
      </div>

      <DateMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default DateFilter;
