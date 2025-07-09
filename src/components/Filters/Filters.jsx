import s from './Filters.module.scss';
import classNames from 'classnames';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// slice (создать соответствующие actions)
// import { setTransactionTypeFilter, setTransactionViewFilter } from '../../redux/filters/slice';
// icons
import { ReactComponent as IconFilterSettingts } from '../../assets/icons/iconFilterSettingts.svg';
import { ReactComponent as IconDoneWhite } from '../../assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconCloseBlue } from '../../assets/icons/iconCloseBlue.svg';

// components
import FilterButton from 'components/General/FilterButton/FilterButton';
import UniButton from 'components/General/UniButton/UniButton';
import RadioButtons from 'components/General/RadioButtons/RadioButtons';

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

const Filters = () => {
  const dispatch = useDispatch();
  const { transactionTypeFilter, transactionViewFilter } = useSelector((state) => state.filters);

  const [openModal, setOpenModal] = useState(false);
  const [transactionType, setTransactionType] = useState(transactionTypeFilter || 'all');
  const [transactionView, setTransactionView] = useState(transactionViewFilter || 'all');
  const [done, setDone] = useState(false);
  const modalRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    if (transactionType !== 'all' || transactionView !== 'all') {
      setDone(true);
    } else {
      setDone(false);
    }
  }, [transactionType, transactionView]);

  const handleOpen = () => {
    setOpenModal(!openModal);
  };

  const handleReset = () => {
    setTransactionType('all');
    setTransactionView('all');
    // dispatch(setTransactionTypeFilter('all'));
    // dispatch(setTransactionViewFilter('all'));
    setOpenModal(false);
  };

  const handleConfirm = () => {
    // dispatch(setTransactionTypeFilter(transactionType));
    // dispatch(setTransactionViewFilter(transactionView));
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
        load={false}
        done={done}
        count={(transactionType !== 'all') + (transactionView !== 'all')}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
      />

      <div ref={modalRef} className={classNames(s.modal, openModal && s.modal_open)}>
        <div className={s.block}>
          <span>Транзакции</span>
          <RadioButtons
            list={transactionTypeList}
            active={transactionType}
            setActive={setTransactionType}
          />
        </div>

        <div className={s.block}>
          <span>Вид Транзакции</span>
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

export default Filters;
