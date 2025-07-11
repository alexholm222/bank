import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import s from './ClearFiltersBtn.module.scss';
import { useDispatch } from 'react-redux';
import {
  setSelectedCompanies,
  setSelectedReceivers,
  setTransactionTypeFilter,
  setTransactionViewFilter,
  setSelectedPayers,
  setSelectedStatus,
} from '../../../../redux/filters/slice';
import classNames from 'classnames';
import { setDateEndPicker, setDateStartPicker } from '../../../../redux/filters/dateRangeSlice';
import { useCallback } from 'react';

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
