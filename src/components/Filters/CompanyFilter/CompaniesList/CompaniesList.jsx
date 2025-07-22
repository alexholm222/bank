import { useEffect, useState } from 'react';

import FilterSearch from 'components/Filters/COMPONENTS/FilterSearch/FilterSearch';
import CheckBox from 'components/General/CheckBox/CheckBox';
import UniButton from 'components/General/UniButton/UniButton';

import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconDone } from 'assets/icons/iconDoneWhite.svg';

import s from './CompaniesList.module.scss';

const CompaniesList = ({ items, selected, onChange, onConfirm, onReset, isOpen }) => {
  const companies = Array.isArray(items) ? items : [];
  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  useEffect(() => {
    setFilteredCompanies(companies);
  }, [items]);

  const handleCheck = (id) => {
    const updated = selected.includes(id)
      ? selected.filter((receiverId) => receiverId !== id)
      : [...selected, id];
    onChange(updated);
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.header}>
          <p>Заказчик</p>
        </div>

        <FilterSearch items={companies} onFilter={setFilteredCompanies} isOpen={isOpen} />

        <ul className={s.list}>
          {filteredCompanies.map((el) => (
            <li key={el.id} onClick={() => handleCheck(el.id)} className={s.item}>
              <div className={s.check}>
                <CheckBox active={selected.includes(el.id)} />
              </div>
              <div className={s.block}>
                <p>{el.name}</p>
                <span>
                  {el.inn && <span>ИНН: {el.inn}</span>}

                  {el.kpp ? ` КПП: ${el.kpp} ` : el.ogrnip ? `ОГРНИП: ${el.ogrnip}` : ''}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={s.buttons}>
        <UniButton icon={IconCloseBlue} type="outline" onClick={onReset} text="Сбросить" />
        <UniButton
          icon={IconDone}
          type="primary"
          onClick={onConfirm}
          text="Применить"
          width={268}
        />
      </div>
    </div>
  );
};

export default CompaniesList;
