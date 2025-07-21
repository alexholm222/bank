import { useEffect, useRef, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedRecognizedType,
  setTransactionTypeFilter,
  setTransactionViewFilter,
} from '../../../redux/filters/slice';

// components
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import CheckBox from 'components/General/CheckBox/CheckBox';
import UniButton from 'components/General/UniButton/UniButton';

// icons
import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconFilterSettingts } from 'assets/icons/iconFilterSettings.svg';

// styles
import s from './TypeFilters.module.scss';
import classNames from 'classnames';

const transactionTypeList = [
  { id: 'income', name: 'Поступления' },
  { id: 'outcome', name: 'Списания' },
];

const transactionViewList = [
  { id: 'payment_order', name: 'Платежные поручения' },
  { id: 'bank_order', name: 'Банковский ордер' },
];

const TypeFilter = ({ isFetching, setActiveFilter, clearActiveFilter, name }) => {
  const selectedTypes = useSelector((state) => state.filters.transactionTypeFilter) || [];
  const selectedViews = useSelector((state) => state.filters.transactionViewFilter) || [];
  const selectedRecognizedType = useSelector((state) => state.filters.selectedRecognizedType) || [];

  const [openModal, setOpenModal] = useState(false);
  const [transactionType, setTransactionType] = useState([]);
  const [transactionView, setTransactionView] = useState([]);
  const [recognizedType, setRecognizedType] = useState('');
  const [load, setLoad] = useState(false);
  const [done, setDone] = useState(false);

  const dispatch = useDispatch();
  const modalRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    setLoad(isFetching);

    const hasActiveFilters =
      selectedTypes.length > 0 || selectedViews.length > 0 || selectedRecognizedType === '1';
    setDone(!isFetching && hasActiveFilters);
  }, [isFetching, selectedTypes, selectedViews, selectedRecognizedType]);

  const handleOpen = () => {
    setTransactionType(selectedTypes);
    setTransactionView(selectedViews);
    setRecognizedType(selectedRecognizedType);
    setOpenModal(true);
    setActiveFilter(name);
  };

  const handleToggle = (id, list, setList) => {
    setList((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleConfirm = () => {
    setLoad(true);
    setActiveFilter(name);
    dispatch(setTransactionTypeFilter(transactionType));
    dispatch(setTransactionViewFilter(transactionView));
    dispatch(setSelectedRecognizedType(recognizedType));
    setOpenModal(false);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    dispatch(setTransactionTypeFilter(null));
    dispatch(setTransactionViewFilter(null));
    dispatch(setSelectedRecognizedType(''));
    setOpenModal(false);
    setDone(false);
    clearActiveFilter();
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
        done={done}
        load={load}
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
          <div
            key="recognizedType"
            className={s.item}
            onClick={() => setRecognizedType((prev) => (prev === '1' ? '' : '1'))}
          >
            <CheckBox active={recognizedType === '1'} />
            <span className={s.checkboxLabel}>Не распознана</span>
          </div>
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
