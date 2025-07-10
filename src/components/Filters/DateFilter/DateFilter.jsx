import s from './DateFilter.module.scss';
import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//icons
import { ReactComponent as IconCalendar } from 'assets/icons/iconCalendar.svg';
import { ReactComponent as IconClose } from 'assets/icons/iconClose.svg';

//slice
import {
  setDateStart,
  setDateEnd,
  setDateStartPicker,
  setDateEndPicker,
} from '../../../redux/filters/dateRangeSlice';
//components

//utils

import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import { DateMenu } from './DateMenu/DateMenu';
import { getTitleDateDuration } from './DateMenu/utils/date';

const DateFilter = () => {
  const { dateStart, dateEnd, dateStartPicker, dateEndPicker } = useSelector(
    (state) => state.dateRange
  );

  const [load, setLoad] = useState(false);
  const [done, setDone] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  const dispatch = useDispatch();
  const dateRef = useRef();

  const resetDate = () => {
    if (dateStartPicker && !dateEndPicker) {
      dispatch(setDateStartPicker(dateStart ? new Date(dateStart) : null));
      dispatch(setDateEndPicker(dateEnd ? new Date(dateEnd) : null));
    }
  };

  const handleResetFilter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setDateStart(''));
    dispatch(setDateEnd(''));
  };

  const handleOpenCalendar = () => {
    setOpenCalendar(true);
    resetDate();
  };

  //   useEffect(() => {
  //     !isFetching && setLoad(false);
  //     !isFetching && dateStart !== '' && setDone(true);
  //   }, [isFetching]);

  useEffect(() => {
    resetDate();
  }, []);

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
      <div
        ref={dateRef}
        onClick={handleOpenCalendar}
        className={classNames(s.filter /* s.root_active */)}
      >
        <FilterButton
          title={!done ? 'Период' : getTitleDateDuration(dateStart, dateEnd)}
          Icon={IconCalendar}
          count={0}
          // load={load}
          // done={done}
          handleReset={handleResetFilter}
          handleOpen={handleOpenCalendar}
          buttonRef={dateRef}
        />

        {/*   <p>{title}</p> */}
        {/* {dateStartPicker && !dateEndPicker && <p>{getTitleDateDuration(dateStart, dateEnd)}</p>} */}
        {/* <div onClick={handleResetFilter} className={classNames(s.block, done && s.block_active)}>
          <IconClose className={s.close} />
        </div> */}
      </div>
      <DateMenu
        isOpen={openCalendar}
        setIsOpen={setOpenCalendar}
        setLoadFilter={setLoad}
        setDone={setDone}
      />
    </div>
  );
};

export default DateFilter;
