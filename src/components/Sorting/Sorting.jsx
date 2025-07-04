import { useEffect,useRef, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import classNames from 'classnames';

import { sortingList } from 'constants/another';
//constants
import { SORTING, SORTING_SPAN } from 'constants/text';

//components
import SortButton from 'components/general/SortButton/SortButton';

import s from './Sorting.module.scss';

import { ReactComponent as IconDoneBlue } from '../../assets/icons/iconDoneBlue.svg';
//icons
import { ReactComponent as IconElevator } from '../../assets/icons/iconElevator.svg';
//slice
import { setSort } from '../../redux/filters/slice';

const Sorting = () => {
  const [openModal, setOpenModal] = useState(false);
  const [load, setLoad] = useState(false);
  const { sort } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const modalRef = useRef();
  const buttonRef = useRef();

  const handleOpen = () => {
    openModal ? setOpenModal(false) : setOpenModal(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setSort(null));
  };

  const handleActive = (el) => {
    el.type === 'default' ? dispatch(setSort(null)) : dispatch(setSort(el));
    setLoad(true);
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
      <SortButton
        title={SORTING}
        Icon={IconElevator}
        load={false}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
        sort={sort ? true : false}
      />
      <div ref={modalRef} className={classNames(s.modal, openModal && s.modal_open)}>
        <span className={s.span}>{SORTING_SPAN}</span>
        <ul className={s.list}>
          {sortingList?.map((el) => {
            return (
              <li onClick={() => handleActive(el)} key={el.id} className={classNames(s.item)}>
                {el.text}
                <span
                  className={classNames(
                    s.icon,
                    ((sort?.type === el.type && sort?.dir === el.dir) ||
                      (!sort && el.type === 'default')) &&
                      s.icon_vis
                  )}
                >
                  <IconDoneBlue />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sorting;
