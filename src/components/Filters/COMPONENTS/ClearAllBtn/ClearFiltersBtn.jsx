import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import s from './ClearFiltersBtn.module.scss';
import { useDispatch } from 'react-redux';
import {
  setSelectedCompanies,
  setSelectedReceivers,
  setTransactionTypeFilter,
  setTransactionViewFilter,
  setSelectedPayers,
} from '../../../../redux/filters/slice';
import classNames from 'classnames';
import { setDateEnd, setDateStart } from '../../../../redux/filters/dateRangeSlice';

const ClearFiltersBtn = ({ text = 'Сбросить всё', animation }) => {
  const dispatch = useDispatch();
  const handleClearAll = () => {
    dispatch(setTransactionTypeFilter('all'));
    dispatch(setTransactionViewFilter('all'));
    dispatch(setSelectedCompanies([]));
    dispatch(setSelectedReceivers([]));
    dispatch(setSelectedPayers([]));
    dispatch(setDateStart(''));
    dispatch(setDateEnd(''));
  };
  return (
    <button className={classNames(s.root, animation && s.root_vis)} onClick={handleClearAll}>
      <span>{text}</span>
      <IconCloseBlue className={s.icon} />
    </button>
  );
};

export default ClearFiltersBtn;
