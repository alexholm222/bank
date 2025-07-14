import { useEffect,useRef, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

// Components
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import RadioButtons from 'components/General/RadioButtons/RadioButtons';
import UniButton from 'components/General/UniButton/UniButton';

import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
// Icons
import { ReactComponent as IconDocSuccess } from 'assets/icons/iconDocSuccess.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';

// Styles
import s from './ActivitiFilter.module.scss';

import { setSelectedActivity } from '../../../redux/filters/slice';

const accountsActivityList = [
  { id: 'active', name: 'Активные' },
  { id: 'unactive', name: 'Не активные' },
  { id: 'all', name: 'Все' },
];

const ActivityFilter = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const selectedActivity = useSelector((state) => state.filters.selectedActivity);
  const [openModal, setOpenModal] = useState(false);
  const [tempActivity, setTempActivity] = useState(selectedActivity);

  const handleOpen = () => {
    setTempActivity(selectedActivity);
    setOpenModal((prev) => !prev);
  };

  const handleConfirm = () => {
    dispatch(setSelectedActivity(tempActivity));
    setOpenModal(false);
  };

  const handleReset = (e) => {
    e?.stopPropagation();
    dispatch(setSelectedActivity('active'));
    setOpenModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpenModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={s.root}>
      <FilterButton
        title="Активные"
        Icon={IconDocSuccess}
        count={selectedActivity !== 'active' ? 1 : 0}
        handleOpen={handleOpen}
        handleReset={handleReset}
        buttonRef={buttonRef}
      />

      <div ref={modalRef} className={classNames(s.modal, { [s.modal_open]: openModal })}>
        <RadioButtons
          list={accountsActivityList}
          active={tempActivity}
          setActive={setTempActivity}
        />

        <div className={s.buttons}>
          <UniButton
            onClick={handleReset}
            text="Сбросить"
            icon={IconCloseBlue}
            type="outline"
            width={108}
          />
          <UniButton onClick={handleConfirm} text="Применить" icon={IconDoneWhite} width={140} />
        </div>
      </div>
    </div>
  );
};

export default ActivityFilter;
