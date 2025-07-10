import s from './ReceiverList.module.scss';
import { useState, useEffect } from 'react';
import { ReactComponent as IconDone } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import UniButton from 'components/General/UniButton/UniButton';
import CheckBox from 'components/General/CheckBox/CheckBox';
import FilterSearch from 'components/Filters/COMPONENTS/FilterSearch/FilterSearch';

const ReceiverList = ({ items, selectedReceivers, onChange, onConfirm, onReset }) => {
  const receivers = Array.isArray(items) ? items : [];
  const [filteredReceivers, setFilteredReceivers] = useState(receivers);

  useEffect(() => {
    setFilteredReceivers(receivers);
  }, [items]);

  const handleCheck = (id) => {
    const updated = selectedReceivers.includes(id)
      ? selectedReceivers.filter((receiverId) => receiverId !== id)
      : [...selectedReceivers, id];
    onChange(updated);
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.header}>
          <p>Заказчик</p>
        </div>

        <FilterSearch receivers={receivers} onFilter={setFilteredReceivers} />

        <ul className={s.list}>
          {filteredReceivers.map((el) => (
            <li key={el.id} onClick={() => handleCheck(el.id)} className={s.item}>
              <div className={s.check}>
                <CheckBox active={selectedReceivers.includes(el.id)} />
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

export default ReceiverList;
