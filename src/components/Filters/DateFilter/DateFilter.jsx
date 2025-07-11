import s from './DateFilter.module.scss';
import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as IconCalendar } from 'assets/icons/iconCalendar.svg';
import { setDateStartPicker, setDateEndPicker } from '../../../redux/filters/dateRangeSlice';
import FilterButton, {
  FilterButtonDate,
} from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import { DateMenu } from './DateMenu/DateMenu';
import { getTitleDateDuration } from './DateMenu/utils/date';

const DateFilter = () => {
  const { dateStartPicker, dateEndPicker } = useSelector((state) => state.dateRange);

  const isSelected = dateStartPicker && dateEndPicker;
  const [load, setLoad] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const dispatch = useDispatch();
  const dateRef = useRef();

  const handleResetFilter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setDateStartPicker(null));
    dispatch(setDateEndPicker(null));
  };

  const handleOpenCalendar = () => {
    setOpenCalendar(true);
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if (dateRef.current && !e.composedPath().includes(dateRef.current)) {
        setOpenCalendar(false);
      }
    };
    document.body.addEventListener('click', clickOutside);
    return () => document.body.removeEventListener('click', clickOutside);
  }, []);

  return (
    <div className={s.root}>
      <div ref={dateRef} onClick={handleOpenCalendar} className={classNames(s.filter)}>
        <FilterButtonDate
          title={isSelected ? getTitleDateDuration(dateStartPicker, dateEndPicker) : 'Период'}
          Icon={IconCalendar}
          isSelected={isSelected}
          handleReset={handleResetFilter}
          handleOpen={handleOpenCalendar}
          buttonRef={dateRef}
        />
      </div>
      <DateMenu isOpen={openCalendar} setIsOpen={setOpenCalendar} setLoadFilter={setLoad} />
    </div>
  );
};

export default DateFilter;
