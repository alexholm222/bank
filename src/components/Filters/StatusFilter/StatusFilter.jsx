import { useEffect,useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

// components
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import RadioButtons from 'components/General/RadioButtons/RadioButtons';
import UniButton from 'components/General/UniButton/UniButton';

import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
// icons
import { ReactComponent as IconDocSuccess } from 'assets/icons/iconDocSuccess.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';

// styles
import s from './StatusFilter.module.scss';

import { setSelectedStatus } from '../../../redux/filters/slice';

const extractionsStatuses = [
  { id: 'all', name: 'Все' },
  { id: 'recognized', name: 'Распознана' },
  { id: 'unrecognized', name: 'Не распознана' },
];

const StatusFilter = () => {
  const selectedStatus = useSelector((state) => state.filters.selectedStatus);

  const [openModal, setOpenModal] = useState(false);
  const [extractionStatus, setExtractionStatus] = useState(selectedStatus);

  const dispatch = useDispatch();
  const modalRef = useRef();
  const buttonRef = useRef();

  const handleOpen = () => {
    setExtractionStatus(selectedStatus);
    setOpenModal((prev) => !prev);
  };

  const handleConfirm = () => {
    dispatch(setSelectedStatus(extractionStatus));
    setOpenModal(false);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    dispatch(setSelectedStatus('all'));
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
        title="Статус"
        Icon={IconDocSuccess}
        count={selectedStatus !== 'all' ? 1 : 0}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
      />

      <div ref={modalRef} className={classNames(s.modal, openModal && s.modal_open)}>
        <div className={s.block}>
          <div className={s.blockTitle}>Статус</div>
          <RadioButtons
            list={extractionsStatuses}
            active={extractionStatus}
            setActive={setExtractionStatus}
          />
        </div>

        <div className={s.buttons}>
          <UniButton
            onClick={handleReset}
            text="Сбросить"
            icon={IconCloseBlue}
            isLoading={false}
            type="outline"
            width={108}
          />

          <UniButton
            onClick={handleConfirm}
            text="Применить"
            icon={IconDoneWhite}
            isLoading={false}
            width={140}
          />
        </div>
      </div>
    </div>
  );
};

export default StatusFilter;
