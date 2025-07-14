import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';

import s from './ClearFiltersBtn.module.scss';

import { setDateEndPicker, setDateStartPicker } from '../../../../redux/filters/dateRangeSlice';
import {
  setSelectedCompanies,
  setSelectedPayers,
  setSelectedReceivers,
  setSelectedStatus,
  setTransactionTypeFilter,
  setTransactionViewFilter,
} from '../../../../redux/filters/slice';

const ClearFiltersBtn = ({ text = 'Сбросить всё', animation = false }) => {
  const dispatch = useDispatch();

  const handleClearAll = useCallback(() => {
    dispatch(setTransactionTypeFilter(''));
    dispatch(setTransactionViewFilter(''));
    dispatch(setSelectedCompanies([]));
    dispatch(setSelectedReceivers([]));
    dispatch(setSelectedPayers([]));
    dispatch(setDateEndPicker(null));
    dispatch(setDateStartPicker(null));
    dispatch(setSelectedStatus('all'));
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
