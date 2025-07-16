import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

// Components
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import UniButton from 'components/General/UniButton/UniButton';
import CheckBox from 'components/General/CheckBox/CheckBox';

// Icons
import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconDocSuccess } from 'assets/icons/iconDocSuccess.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';

// Styles
import s from './ActivitiFilter.module.scss';

import { setSelectedActivity } from '../../../redux/filters/slice';

const accountsActivityList = [
  { id: 'active', name: 'Активные' },
  { id: 'unactive', name: 'Не активные' },
];

const ActivityFilter = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const selectedActivity = useSelector((state) => state.filters.selectedActivity || []);
  const [openModal, setOpenModal] = useState(false);
  const [tempActivity, setTempActivity] = useState(selectedActivity || []);

  const handleOpen = () => {
    setTempActivity(selectedActivity || []);
    setOpenModal((prev) => !prev);
  };

  const handleConfirm = () => {
    dispatch(setSelectedActivity(tempActivity));
    setOpenModal(false);
  };

  const handleReset = (e) => {
    e?.stopPropagation();
    dispatch(setSelectedActivity([]));
    setOpenModal(false);
  };

  const toggleActivity = (id) => {
    setTempActivity((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
        count={selectedActivity.length}
        handleOpen={handleOpen}
        handleReset={handleReset}
        buttonRef={buttonRef}
      />

      <div ref={modalRef} className={classNames(s.modal, { [s.modal_open]: openModal })}>
        {accountsActivityList.map((item) => (
          <div key={item.id} className={s.item} onClick={() => toggleActivity(item.id)}>
            <CheckBox active={tempActivity.includes(item.id)} />
            <span className={s.checkboxLabel}>{item.name}</span>
          </div>
        ))}

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
