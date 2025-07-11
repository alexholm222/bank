import { useRef, useState, useEffect } from 'react';

// icons
import { ReactComponent as IconDocSuccess } from 'assets/icons/iconDocSuccess.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';

// components
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import UniButton from 'components/General/UniButton/UniButton';
import RadioButtons from 'components/General/RadioButtons/RadioButtons';
// styles
import s from './ActivitiFilter.module.scss';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedActivity } from '../../../redux/filters/slice';

const accountsActivityList = [
  { id: 'active', name: 'Активные' },
  { id: 'unactive', name: 'Не активные' },
  { id: 'all', name: 'Все' },
];

const ActivityFilter = () => {
  const selectedActivity = useSelector((state) => state.filters.selectedActivity);
  console.log(selectedActivity);
  const [openModal, setOpenModal] = useState(false);
  const [accountsActivity, setAccountsActivity] = useState(selectedActivity);

  const dispatch = useDispatch();
  const modalRef = useRef();
  const buttonRef = useRef();

  const handleOpen = () => {
    setAccountsActivity(selectedActivity);
    setOpenModal((prev) => !prev);
  };

  const handleConfirm = () => {
    dispatch(setSelectedActivity(accountsActivity));
    setOpenModal(false);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    dispatch(setSelectedActivity('active'));
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
        title="Активные"
        Icon={IconDocSuccess}
        count={selectedActivity !== 'active' ? 1 : 0}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
      />

      <div ref={modalRef} className={classNames(s.modal, openModal && s.modal_open)}>
        {/* <div className={s.block}>
          <div className={s.blockTitle}>Статус</div>
        </div>{' '} */}
        <RadioButtons
          list={accountsActivityList}
          active={accountsActivity}
          setActive={setAccountsActivity}
        />
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

export default ActivityFilter;
