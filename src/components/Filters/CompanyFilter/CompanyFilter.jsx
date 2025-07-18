import { useEffect, useRef, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCompanies } from '../../../redux/filters/slice';
import { useGetCompaniesQuery } from '../../../redux/services/filtersApiActions';

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
import s from './CompanyFilter.module.scss';

const CompanyItem = ({ data, selected, toggleSelection }) => (
  <div onClick={() => toggleSelection(data.id)} className={s.item}>
    <div className={s.check}>
      <CheckBox active={selected} />
    </div>
    <div className={s.block}>
      <p>{data.name}</p>
      <span>
        ИНН: {data.inn} {data.kpp && `КПП: ${data.kpp}`}
      </span>
    </div>
  </div>
);

export const CompanyFilter = ({ isFetching, setActiveFilter, clearActiveFilter, name }) => {
  const { data, isLoading, error } = useGetCompaniesQuery();

  const dispatch = useDispatch();
  const selectedCompanies = useSelector((state) => state.filters.selectedCompanies);
  const [open, setOpen] = useState(false);
  const [localSelected, setLocalSelected] = useState([]);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const [load, setLoad] = useState(false);
  const [done, setDone] = useState(false);

  const partnerships = data?.partnerships || [];

  useEffect(() => {
    setLocalSelected(selectedCompanies || []);
  }, [selectedCompanies, data]);

  useEffect(() => {
    setLoad(isFetching);
    setDone(!isFetching && selectedCompanies?.length > 0);
  }, [isFetching, selectedCompanies]);

  const toggleSelection = (id) => {
    const numericId = Number(id);
    setLocalSelected((prev) =>
      prev.includes(numericId) ? prev.filter((item) => item !== numericId) : [...prev, numericId]
    );
  };

  const handleConfirm = () => {
    dispatch(setSelectedCompanies(localSelected));
    setActiveFilter();
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen((prev) => !prev);
    setActiveFilter(name);
  };

  const handleReset = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setLocalSelected([]);
    dispatch(setSelectedCompanies([]));
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
      }
    };
    document.body.addEventListener('mousedown', clickOutside);
    return () => document.body.removeEventListener('mousedown', clickOutside);
  }, []);

  const partnershipCityMap = Object.fromEntries(
    data?.partnership_details?.map(({ partnership_id, city }) => [partnership_id, city]) || []
  );

  const companiesByCity = {};

  data?.companies?.forEach((company) => {
    const city = partnershipCityMap[company.id];
    if (city) {
      if (!companiesByCity[city]) companiesByCity[city] = [];
      companiesByCity[city].push(company);
    }
  });

  const uniqueCities = [...new Set(partnerships.map((item) => item.city).filter(Boolean))];

  return (
    <div className={s.container}>
      <div className={classNames(s.overlay, open && s.overlay_anim)} />

      <FilterButton
        title="Компания"
        Icon={IconHome}
        count={selectedCompanies.length}
        handleReset={handleReset}
        handleOpen={handleOpen}
        load={load}
        done={done}
        buttonRef={buttonRef}
      />

      <div ref={modalRef} className={classNames(s.modal, { [s.modal_open]: open })}>
        <div className={s.list}>
          <div className={s.headerTitle}>Мои компании</div>
        </div>

        <div className={s.listContainer}>
          {Object.entries(companiesByCity).map(([city, companies]) => (
            <div key={city} className={s.list}>
              <span>{city}</span>
              {companies.map((company) => (
                <CompanyItem
                  key={company.id}
                  data={company}
                  selected={localSelected.includes(company.id)}
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

export default CompanyFilter;
