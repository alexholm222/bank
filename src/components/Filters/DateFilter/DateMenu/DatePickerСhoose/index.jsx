import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { setDateEndPicker, setDateStartPicker } from '../../../../../redux/filters/dateRangeSlice';
import './DatePickerСhoose.scss';

export const DatePickerСhoose = ({ setOpenDateFilter, setLoadFilter }) => {
  const dispatch = useDispatch();
  const { dateStartPicker, dateEndPicker } = useSelector((state) => state.dateRange);

  const onChange = (dates) => {
    const [start, end] = dates;
    dispatch(setDateStartPicker(start));
    dispatch(setDateEndPicker(end));

    if (end) {
      setLoadFilter(true);
      setOpenDateFilter(false);
    }
  };

  registerLocale('ru', ru);

  return (
    <DatePicker
      selected={dateStartPicker}
      onChange={onChange}
      startDate={dateStartPicker}
      endDate={dateEndPicker}
      selectsRange
      inline
      locale={'ru'}
    />
  );
};
