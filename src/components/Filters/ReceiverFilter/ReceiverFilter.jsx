import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

// Redux
import { setSelectedReceivers } from '../../../redux/filters/slice';

// Components
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import ReceiverList from 'components/Filters/ReceiverFilter/ReceiverList/ReceiverList';

// Icons
import { ReactComponent as IconDocBag } from 'assets/icons/iconDocBag.svg';

// Styles
import s from './ReceiverFilter.module.scss';

const ReceiverFilter = ({ data, isFetching, setActiveFilter, clearActiveFilter, name }) => {
  const dispatch = useDispatch();
  const selectedReceivers = useSelector((state) => state.filters.selectedReceivers);

  const [localSelected, setLocalSelected] = useState(selectedReceivers);
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [done, setDone] = useState(false);

  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
    setActiveFilter(name);
  };

  const handleConfirm = () => {
    dispatch(setSelectedReceivers(localSelected));
    setIsOpen(false);
  };

  const handleReset = (e) => {
    e?.stopPropagation();
    setLocalSelected([]);
    dispatch(setSelectedReceivers([]));
    setIsOpen(false);
    clearActiveFilter();
  };

  const handleChange = (newSelected) => {
    setLocalSelected(newSelected);
  };
  useEffect(() => {
    setLoad(isFetching);

    const hasSelected = selectedReceivers?.length > 0;
    setDone(!isFetching && hasSelected);
  }, [isFetching, selectedReceivers]);

  useEffect(() => {
    setLocalSelected(selectedReceivers);
  }, [selectedReceivers]);

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
        title="Заказчик"
        Icon={IconDocBag}
        count={selectedReceivers.length}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
        load={load}
        done={done}
      />

      <div ref={modalRef} className={classNames(s.modal, { [s.modal_open]: isOpen })}>
        <ReceiverList
          items={data}
          selectedReceivers={localSelected}
          onChange={handleChange}
          onConfirm={handleConfirm}
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

export default ReceiverFilter;
