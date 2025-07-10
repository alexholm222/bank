import s from './ReceiverFilter.module.scss';
import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IсonDocBag } from 'assets/icons/iconDocBag.svg';
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import ReceiverList from 'components/Filters/ReceiverFilter/ReceiverList/ReceiverList';
import { setSelectedReceivers } from '../../../redux/filters/slice';

const ReceiverFilter = ({ data }) => {
  const filterReceivers = useSelector((state) => state.filters.selectedReceivers);

  const [selectedReceivers, setSelectedReceiversLocal] = useState(filterReceivers);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const modalRef = useRef();
  const buttonRef = useRef();

  const handleOpen = (e) => {
    setOpenModal((prev) => !prev);
  };

  const handleConfirm = () => {
    dispatch(setSelectedReceivers(selectedReceivers));
    setOpenModal(false);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setSelectedReceiversLocal([]);
    dispatch(setSelectedReceivers([]));
  };

  const handleReceiverChange = (newSelected) => {
    setSelectedReceiversLocal(newSelected);
  };
  useEffect(() => {
    setSelectedReceiversLocal(filterReceivers);
  }, [filterReceivers]);

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
        title="Заказчик"
        Icon={IсonDocBag}
        count={filterReceivers.length}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
      />

      <div ref={modalRef} className={classNames(s.modal, openModal && s.modal_open)}>
        <ReceiverList
          items={data}
          selectedReceivers={selectedReceivers}
          onChange={handleReceiverChange}
          onConfirm={handleConfirm}
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

export default ReceiverFilter;
