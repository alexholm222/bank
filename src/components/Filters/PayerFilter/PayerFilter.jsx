import s from './PayerFilter.module.scss';
import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconWallet } from 'assets/icons/iconWallet.svg';
import { setSelectedPayers } from '../../../redux/filters/slice';
import PayersList from 'components/Filters/PayerFilter/ReceiverList/PayersList';
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';

const PayerFilter = ({ data }) => {
  const filterPayers = useSelector((state) => state.filters.selectedPayers);

  const [selectedPayers, setSelectedPayersLocal] = useState(filterPayers);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const modalRef = useRef();
  const buttonRef = useRef();

  const handleOpen = () => {
    setOpenModal((prev) => !prev);
  };

  const handleConfirm = () => {
    dispatch(setSelectedPayers(selectedPayers));
    setOpenModal(false);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setSelectedPayersLocal([]);
    dispatch(setSelectedPayers([]));
  };

  const handlePayersChange = (newSelected) => {
    setSelectedPayersLocal(newSelected);
  };
  useEffect(() => {
    setSelectedPayersLocal(filterPayers);
  }, [filterPayers]);

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
        title="Плательщик"
        Icon={IconWallet}
        count={filterPayers.length}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
      />

      <div ref={modalRef} className={classNames(s.modal, openModal && s.modal_open)}>
        <PayersList
          items={data}
          selected={selectedPayers}
          onChange={handlePayersChange}
          onConfirm={handleConfirm}
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

export default PayerFilter;
