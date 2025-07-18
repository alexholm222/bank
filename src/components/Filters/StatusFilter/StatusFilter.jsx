import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

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
  const selectedStatus = useSelector((state) => state.filters.selectedStatus || []);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [tempStatuses, setTempStatuses] = useState(selectedStatus);
  const [load, setLoad] = useState(false);
  const [done, setDone] = useState(false);

  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const handleOpen = () => {
    setTempStatuses(selectedStatus);
    setOpenModal(true);
    setActiveFilter(name);
  };

  const handleToggle = (id) => {
    setTempStatuses((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const handleConfirm = () => {
    dispatch(setSelectedStatus(tempStatuses));
    setOpenModal(false);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    dispatch(setSelectedStatus([]));
    setOpenModal(false);
    clearActiveFilter();
  };

  useEffect(() => {
    setLoad(isFetching);

    const hasSelected = selectedStatus?.length > 0;
    setDone(!isFetching && hasSelected);
  }, [isFetching, selectedStatus]);

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
        count={selectedStatus.length}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
        load={load}
        done={done}
      />

      <div ref={modalRef} className={classNames(s.modal, openModal && s.modal_open)}>
        <div className={s.block}>
          <div className={s.blockTitle}>Статус</div>

          {extractionsStatuses.map((item) => (
            <div key={item.id} className={s.item} onClick={() => handleToggle(item.id)}>
              <CheckBox active={tempStatuses.includes(item.id)} />
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
