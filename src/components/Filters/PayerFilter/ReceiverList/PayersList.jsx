import s from './PayersList.module.scss';
import { useState, useEffect } from 'react';
import { ReactComponent as IconSearch } from 'assets/icons/iconSearch.svg';
import { ReactComponent as IconDone } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import UniButton from 'components/General/UniButton/UniButton';
import CheckBox from 'components/General/CheckBox/CheckBox';
import FilterSearch from 'components/Filters/COMPONENTS/FilterSearch/FilterSearch';

const PayersList = ({ items: payers, selected, onChange, onConfirm, onReset }) => {
  const [filteredReceivers, setFilteredReceivers] = useState(payers);
  useEffect(() => {
    setFilteredReceivers(payers);
  }, [payers]);

  const handleCheck = (id) => {
    const updated = selected.includes(id)
      ? selected.filter((payerId) => payerId !== id)
      : [...selected, id];
    onChange(updated);
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.header}>
          <p>Заказчик</p>
        </div>

        <FilterSearch receivers={payers} onFilter={setFilteredReceivers} />

        <ul className={s.list}>
          <ul className={s.list}>
            {filteredReceivers.map((el) => (
              <li key={el.id} onClick={() => handleCheck(el.id)} className={s.item}>
                <div className={s.check}>
                  <CheckBox active={selected.includes(el.id)} />
                </div>
                <div className={s.block}>
                  <p>{el.name}</p>
                  <span>
                    ИНН: {el.inn}{' '}
                    {el.kpp ? `КПП: ${el.kpp}` : el.ogrnip ? `ОГРНИП: ${el.ogrnip}` : ''}
                  </span>
                </div>
              </li>
            ))}
          </ul>
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

export default PayersList;
