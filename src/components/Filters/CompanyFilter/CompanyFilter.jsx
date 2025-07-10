import s from './CompanyFilter.module.scss';
import { ReactComponent as IconHome } from 'assets/icons/iconHome.svg';
import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

// components
import CheckBox from 'components/General/CheckBox/CheckBox';

import { setSelectedCompanies } from '../../../redux/filters/slice';
import UniButton from 'components/General/UniButton/UniButton';
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';

const Item = ({ data, activeCompany, setActiveCompany }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const result = activeCompany?.find((el) => el == data.id);
    setActive(!!result);
  }, [activeCompany, data.id]);

  const handleCheck = (e) => {
    const id = Number(e.currentTarget.id);
    if (!active) {
      setActiveCompany((prevState) => [...prevState, id]);
    } else {
      setActiveCompany((prevState) => prevState.filter((el) => el !== id));
    }
  };

  return (
    <div onClick={handleCheck} id={data.id} className={s.item}>
      <div className={s.check}>
        <CheckBox active={active} />
      </div>

      <div className={s.block}>
        <p>{data.name}</p>
        <span>
          ИНН: {data.inn} {data.kpp !== '' && `КПП: ${data.kpp}`}
        </span>
      </div>
    </div>
  );
};

export const CompanyFilter = ({ data }) => {
  const filterCompanys = useSelector((state) => state.filters.selectedCompanies);
  const [activeCompany, setActiveCompany] = useState(filterCompanys || []);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const isFetchingOrders = false;

  const cites = data?.partnerships
    ?.reduce((accumulator, current) => {
      if (accumulator.findIndex((object) => object.city === current.city) === -1) {
        accumulator.push(current);
      }
      return accumulator;
    }, [])
    .map((el) => el.city);

  useEffect(() => {
    setActiveCompany(filterCompanys || []);
  }, [filterCompanys]);

  const handleConfirm = () => {
    dispatch(setSelectedCompanies(activeCompany));
    setOpen(false);
  };

  const handleReset = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveCompany([]);
    dispatch(setSelectedCompanies([]));
  };

  const handleOpenModal = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {data?.partnerships?.length > 1 ? (
        <div
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleConfirm();
          }}
          className={s.container}
        >
          <div
            onMouseDown={handleClose}
            className={classNames(s.overlay, open && s.overlay_anim)}
          ></div>

          <FilterButton
            title="Компания"
            Icon={IconHome}
            load={false}
            done={false}
            count={(filterCompanys ?? []).length}
            handleReset={handleReset}
            handleOpen={handleOpenModal}
          />

          <div className={classNames(s.modal, open && s.modal_open)}>
            <div className={s.list} key="all">
              <div className={s.headerTitle}>Мои компании</div>
            </div>

            <div className={s.listContainer}>
              {cites?.map((city) => {
                const items = data.partnerships.filter((item) => item.city === city);
                return (
                  <div className={s.list} key={city}>
                    <span>{city}</span>
                    {items.map((el) => (
                      <Item
                        key={el.id}
                        data={el}
                        setActiveCompany={setActiveCompany}
                        activeCompany={activeCompany}
                      />
                    ))}
                  </div>
                );
              })}
            </div>

            <div className={s.buttons}>
              <UniButton
                onClick={handleReset}
                text="Сбросить"
                icon={IconCloseBlue}
                isLoading={false}
                type="outline"
              />

              <UniButton
                onClick={handleConfirm}
                text="Применить"
                icon={IconDoneWhite}
                isLoading={false}
                width={268}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CompanyFilter;
