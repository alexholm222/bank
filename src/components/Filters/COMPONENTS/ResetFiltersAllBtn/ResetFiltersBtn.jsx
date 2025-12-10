import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';

import s from './ResetFiltersBtn.module.scss';

import { resetAllDates } from '../../../../redux/filters/dateRangeSlice';
import { resetAllFilters } from '../../../../redux/filters/slice';


const ClearFiltersBtn = ({ text = 'Сбросить всё', animation = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleClearAll = useCallback(() => {
    dispatch(resetAllFilters());
    dispatch(resetAllDates());
    navigate('/')
  }, [dispatch]);

  return (
    <button
      className={classNames(s.root, animation && s.root_vis)}
      onClick={handleClearAll}
      type="button"
    >
      <span>{text}</span>
      <IconCloseBlue className={s.icon} />
    </button>
  );
};
export default ClearFiltersBtn;
