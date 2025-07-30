import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { selectSelectedStatus } from '../../../redux/filters/filtersSelectors';

// components
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import UniButton from 'components/General/UniButton/UniButton';
import CheckBox from 'components/General/CheckBox/CheckBox';

import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconDocSuccess } from 'assets/icons/iconDocSuccess.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';

import s from './StatusFilter.module.scss';

import { setSelectedStatus } from '../../../redux/filters/slice';

const extractionsStatuses = [
  { id: 'recognized', name: 'Распознана' },
  { id: 'unrecognized', name: 'Не распознана' },
];

const StatusFilter = ({ isFetching, setActiveFilter, clearActiveFilter, name }) => {
  const selectedStatus = useSelector(selectSelectedStatus);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [tempStatus, setTempStatus] = useState(selectedStatus || '');

  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const done = !isFetching && selectedStatus !== '';

  const handleOpen = () => {
    setTempStatus(selectedStatus || '');
    setOpenModal(true);
  };

  const handleToggle = (id) => {
    setTempStatus((prev) => (prev === id ? '' : id));
  };

  const handleConfirm = () => {
    dispatch(setSelectedStatus(tempStatus));
    setActiveFilter(name);
    setOpenModal(false);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    dispatch(setSelectedStatus(''));
    setOpenModal(false);
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
        title="Статус"
        Icon={IconDocSuccess}
        count={selectedStatus !== '' ? 1 : ''}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
        load={isFetching}
        done={done}
      />

      <div ref={modalRef} className={classNames(s.modal, openModal && s.modal_open)}>
        <div className={s.block}>
          <div className={s.blockTitle}>Статус</div>

          {extractionsStatuses.map((item) => (
            <div key={item.id} className={s.item} onClick={() => handleToggle(item.id)}>
              <CheckBox active={tempStatus === item.id} />
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
