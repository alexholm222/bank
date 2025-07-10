import { useRef, useState, useEffect } from 'react';

// icons
import { ReactComponent as IconFilterSettingts } from 'assets/icons/iconFilterSettings.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';

// components
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import UniButton from 'components/General/UniButton/UniButton';
import RadioButtons from 'components/General/RadioButtons/RadioButtons';
// styles
import s from './TypeFilters.module.scss';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactionTypeFilter, setTransactionViewFilter } from '../../../redux/filters/slice';

const transactionTypeList = [
  { id: 'all', name: 'Все' },
  { id: 'income', name: 'Поступления' },
  { id: 'expense', name: 'Списания' },
];

const transactionViewList = [
  { id: 'all', name: 'Все' },
  { id: 'payment_order', name: 'Платежные поручения' },
  { id: 'bank_order', name: 'Банковский ордер' },
];

const TypeFilter = () => {
  const selectedTypes = useSelector((state) => state.filters.transactionTypeFilter);
  const selectedViews = useSelector((state) => state.filters.transactionViewFilter);

  const [openModal, setOpenModal] = useState(false);
  const [transactionType, setTransactionType] = useState('all');
  const [transactionView, setTransactionView] = useState('all');

  const dispatch = useDispatch();
  const modalRef = useRef();
  const buttonRef = useRef();

  const handleOpen = () => {
    setTransactionType(selectedTypes);
    setTransactionView(selectedViews);
    setOpenModal((prev) => !prev);
  };

  const handleConfirm = () => {
    dispatch(setTransactionTypeFilter(transactionType));
    dispatch(setTransactionViewFilter(transactionView));
    setOpenModal(false);
  };
  const handleReset = (e) => {
    e.stopPropagation();
    dispatch(setTransactionTypeFilter('all'));
    dispatch(setTransactionViewFilter('all'));
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
        title="Фильтры"
        Icon={IconFilterSettingts}
        count={(selectedTypes !== 'all') + (selectedViews !== 'all')}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
      />

      <div ref={modalRef} className={classNames(s.modal, openModal && s.modal_open)}>
        <div className={s.block}>
          <div className={s.blockTitle}>Транзакции</div>
          <RadioButtons
            list={transactionTypeList}
            active={transactionType}
            setActive={setTransactionType}
          />
        </div>

        <div className={s.block}>
          <div className={s.blockTitle}>Вид Транзакции</div>
          <RadioButtons
            list={transactionViewList}
            active={transactionView}
            setActive={setTransactionView}
          />
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
