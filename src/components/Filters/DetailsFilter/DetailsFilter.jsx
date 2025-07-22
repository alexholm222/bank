import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import React from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPartnerships } from '../../../redux/filters/slice';

// components
import CheckBox from 'components/General/CheckBox/CheckBox';
import UniButton from 'components/General/UniButton/UniButton';
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';

// icons
import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconHome } from 'assets/icons/iconHome.svg';

// styles
import classNames from 'classnames';
import s from './DetailsFilter.module.scss';

const CompanyItem = ({ data, selected, toggleSelection }) => {
  return (
    <div onClick={() => toggleSelection(data.rs)} className={s.item}>
      <div className={s.check}>
        <CheckBox active={selected} />
      </div>
      <div className={s.block}>
        <p>{data.name}</p>
        <span>
          ИНН: {data.inn} {data.kpp ? `КПП: ${data.kpp}` : `ОГРНИП ${data.ogrnip}`}
        </span>
        <span>{`*${data.rs.slice(-4)} ${data.bank}`}</span>
      </div>
    </div>
  );
};

export const DetailsFilter = ({ isFetching, setActiveFilter, clearActiveFilter, name }) => {
  const dispatch = useDispatch();
  const selectedPartnerships = useSelector((state) => state.filters.selectedPartnerships);
  const partnershipsList = useSelector((state) => state.companiesList?.partnerships) ?? [];

  const [open, setOpen] = useState(false);
  const [localSelected, setLocalSelected] = useState([]);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const [load, setLoad] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (selectedPartnerships !== localSelected) {
      setLocalSelected(selectedPartnerships || []);
    }
  }, [selectedPartnerships]);

  useEffect(() => {
    setLoad(isFetching);
    setDone(!isFetching && selectedPartnerships?.length > 0);
  }, [isFetching, selectedPartnerships]);

  // const toggleSelection = (id) => {
  //   const numericId = Number(id);
  //   setLocalSelected((prev) =>
  //     prev.includes(numericId) ? prev.filter((item) => item !== numericId) : [...prev, numericId]
  //   );
  // };
  const toggleSelection = useCallback((rs) => {
    setLocalSelected((prev) =>
      prev.includes(rs) ? prev.filter((item) => item !== rs) : [...prev, rs]
    );
  }, []);

  const handleConfirm = () => {
    dispatch(setSelectedPartnerships(localSelected));
    setActiveFilter('details');
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
    setActiveFilter(name);
  };

  const handleReset = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setLocalSelected([]);
    dispatch(setSelectedPartnerships([]));
    setDone(false);
    setOpen(false);
    clearActiveFilter();
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
        clearActiveFilter();
      }
    };
    document.body.addEventListener('mousedown', clickOutside);
    return () => document.body.removeEventListener('mousedown', clickOutside);
  }, []);

  const companiesByCity = useMemo(() => {
    const grouped = {};

    partnershipsList.forEach((company) => {
      const city = company.city;
      if (city) {
        if (!grouped[city]) grouped[city] = [];
        grouped[city].push({
          id: company.partnership_id,
          name: company.partnership_name,
          inn: company.inn,
          kpp: company.kpp,
          bank: company.bank,
          rs: company.rs,
          ogrnip: company?.origip,
        });
      }
    });

    return grouped;
  }, [partnershipsList]);

  return (
    <div className={s.container}>
      <div className={classNames(s.overlay, open && s.overlay_anim)} />

      <FilterButton
        title="Реквизиты"
        Icon={IconHome}
        count={selectedPartnerships.length}
        handleReset={handleReset}
        handleOpen={handleOpen}
        load={load}
        done={done}
        buttonRef={buttonRef}
      />

      <div ref={modalRef} className={classNames(s.modal, { [s.modal_open]: open })}>
        <div className={s.list}>
          <div className={s.headerTitle}>Реквизиты</div>
        </div>

        <div className={s.listContainer}>
          {Object.entries(companiesByCity).map(([city, companies]) => (
            <div key={city} className={s.list}>
              <span className={s.cityTitle}>{city}</span>
              {companies.map((company, index) => (
                <CompanyItem
                  key={`${company.id}-${index}`}
                  data={company}
                  selected={localSelected.includes(company.rs)}
                  toggleSelection={toggleSelection}
                />
              ))}
            </div>
          ))}
        </div>

        <div className={s.buttons}>
          <UniButton onClick={handleReset} text="Сбросить" icon={IconCloseBlue} type="outline" />
          <UniButton onClick={handleConfirm} text="Применить" icon={IconDoneWhite} width={268} />
        </div>
      </div>
    </div>
  );
};

export default DetailsFilter;
