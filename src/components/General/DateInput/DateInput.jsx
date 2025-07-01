import { ReactComponent as CalendarIcon } from "assets/icons/iconCalendar.svg";

import s from "./DateInput.module.scss";

import dayjs from "dayjs";

const DateInput = ({ selectedDate, setOpenCalendar }) => {
  return (
    <div className={s.wrapper} onClick={() => setOpenCalendar(true)}>
      <div className={s.inputBox}>
        {dayjs(selectedDate).format("DD.MM.YYYY")}
        <CalendarIcon className={s.icon} />
      </div>
    </div>
  );
};

export default DateInput;
