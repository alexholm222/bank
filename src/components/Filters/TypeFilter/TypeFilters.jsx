import { useEffect,useRef, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

// components
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import CheckBox from 'components/General/CheckBox/CheckBox';
import UniButton from 'components/General/UniButton/UniButton';

import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
// icons
import { ReactComponent as IconFilterSettingts } from 'assets/icons/iconFilterSettings.svg';

// styles
import s from './TypeFilters.module.scss';

import { setTransactionTypeFilter, setTransactionViewFilter } from '../../../redux/filters/slice';

const transactionTypeList = [
  { id: 'income', name: 'Поступления' },
  { id: 'expense', name: 'Списания' },
];

const transactionViewList = [
  { id: 'payment_order', name: 'Платежные поручения' },
  { id: 'bank_order', name: 'Банковский ордер' },
];

const TypeFilter = () => {
  const selectedTypes = useSelector((state) => state.filters.transactionTypeFilter) || [];
  const selectedViews = useSelector((state) => state.filters.transactionViewFilter) || [];

  const [openModal, setOpenModal] = useState(false);
  const [transactionType, setTransactionType] = useState([]);
  const [transactionView, setTransactionView] = useState([]);

  const dispatch = useDispatch();
  const modalRef = useRef();
  const buttonRef = useRef();

  const handleOpen = () => {
    setTransactionType(selectedTypes);
    setTransactionView(selectedViews);
    setOpenModal((prev) => !prev);
  };

  const handleToggle = (id, list, setList) => {
    setList((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleConfirm = () => {
    dispatch(setTransactionTypeFilter(transactionType));
    dispatch(setTransactionViewFilter(transactionView));
    setOpenModal(false);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    dispatch(setTransactionTypeFilter([]));
    dispatch(setTransactionViewFilter([]));
    setOpenModal(false);
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpenModal(false);
      }
    };
    document.body.addEventListener('mousedown', clickOutside);
    return () => document.body.removeEventListener('mousedown', clickOutside);
  }, []);

  return (
    <div className={s.root}>
      <FilterButton
        title="Транзакции"
        Icon={IconFilterSettingts}
        count={selectedTypes.length + selectedViews.length}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
      />

      <div ref={modalRef} className={classNames(s.modal, openModal && s.modal_open)}>
        <div className={s.block}>
          <div className={s.blockTitle}>Тип транзакции</div>
          {transactionTypeList.map((item) => (
            <div
              key={item.id}
              className={s.item}
              onClick={() => handleToggle(item.id, transactionType, setTransactionType)}
            >
              <CheckBox active={transactionType.includes(item.id)} />
              <span className={s.checkboxLabel}>{item.name}</span>
            </div>
          ))}
        </div>

        <div className={s.block}>
          <div className={s.blockTitle}>Вид транзакции</div>
          {transactionViewList.map((item) => (
            <div
              key={item.id}
              className={s.item}
              onClick={() => handleToggle(item.id, transactionView, setTransactionView)}
            >
              <CheckBox active={transactionView.includes(item.id)} />
              <span className={s.checkboxLabel}>{item.name}</span>
            </div>
          ))}
        </div>

        <div className={s.buttons}>
          <UniButton
            onClick={handleReset}
            text="Сбросить"
            icon={IconCloseBlue}
            isLoading={false}
            type="outline"
          />
          <UniButton
            onClick={handleConfirm}
            text="Применить"
            icon={IconDoneWhite}
            isLoading={false}
            width={218}
          />
        </div>
      </div>
    </div>
  );
};

export default TypeFilter;
