import { useState } from 'react';
import dayjs from 'dayjs';

//icons
import { ReactComponent as CalendarIcon } from 'assets/icons/iconCalendar.svg';

//styles
import s from './DateInput.module.scss';

import 'dayjs/locale/ru';

const DateInput = ({ selectedDate, setSelectedDate, setOpenCalendar }) => {
  dayjs.locale('ru');
  const [inputValue, setInputValue] = useState(dayjs(selectedDate).format('DD.MM.YYYY'));

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const parsed = dayjs(value, 'DD.MM.YYYY', true);
    if (parsed.isValid()) setSelectedDate(parsed);
  };
  return (
    <div className={s.wrapper} onClick={() => setOpenCalendar(true)}>
      <input
        className={s.inputBox}
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setOpenCalendar(true)}
        placeholder="дд.мм.гггг"
      />
      <CalendarIcon className={s.icon} />
    </div>
  );
};

export default DateInput;
