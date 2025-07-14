import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

// Redux
import { setSelectedPayers } from '../../../redux/filters/slice';

// Components
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import PayersList from 'components/Filters/PayerFilter/PayersList/PayersList';

// Icons
import { ReactComponent as IconWallet } from 'assets/icons/iconWallet.svg';

// Styles
import s from './PayerFilter.module.scss';

const PayerFilter = ({ data }) => {
  const dispatch = useDispatch();
  const filterPayers = useSelector((state) => state.filters.selectedPayers);

  const [localSelected, setLocalSelected] = useState(filterPayers);
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const handleToggleModal = () => setIsOpen((prev) => !prev);

  const handleConfirm = () => {
    dispatch(setSelectedPayers(localSelected));
    setIsOpen(false);
  };

  const handleReset = (e) => {
    e?.stopPropagation();
    setLocalSelected([]);
    dispatch(setSelectedPayers([]));
  };

  const handleChange = (updated) => {
    setLocalSelected(updated);
  };

  useEffect(() => {
    setLocalSelected(filterPayers);
  }, [filterPayers]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={s.root}>
      <FilterButton
        title="Плательщик"
        Icon={IconWallet}
        count={filterPayers.length}
        handleReset={handleReset}
        handleOpen={handleToggleModal}
        buttonRef={buttonRef}
      />

      <div ref={modalRef} className={classNames(s.modal, { [s.modal_open]: isOpen })}>
        <PayersList
          items={data}
          selected={localSelected}
          onChange={handleChange}
          onConfirm={handleConfirm}
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

export default PayerFilter;
