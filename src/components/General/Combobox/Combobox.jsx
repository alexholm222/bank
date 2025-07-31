import React, { useRef, useState } from 'react';
import Select, { components } from 'react-select';
import classNames from 'classnames';

// icons
import { ReactComponent as IconWarning } from 'assets/icons/iconWarning.svg';
// import { ReactComponent as IconChevronDown } from 'assets/icons/iconChevron.svg'; // не используется

// styles
import s from './Combobox.module.scss';
import getCustomStyles from './selectCustomStyles';
import CompanyLabelBadge from '../CompanyLabelBadge/CompanyLabelBadge';

const CustomOption = (props) => {
  const isValid = (val) => typeof val === 'string' && val.trim() !== '' && val !== '0';
  const { data, innerRef, innerProps, isFocused } = props;
  const isOGRNIP = data.inn?.length === 12 && isValid(data.ogrn);

  const details = [
    isValid(data.inn) ? `ИНН ${data.inn}` : null,
    isValid(data.kpp) ? `КПП ${data.kpp}` : null,
    isValid(data.ogrn) ? (isOGRNIP ? `ОГРНИП ${data.ogrn}` : `ОГРН ${data.ogrn}`) : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={classNames(s.option, { [s.focused]: isFocused })}
    >
      <div className={s.companyInfo}>
        <div className={s.companyName}>{data.label}</div>
        <div className={s.companyDetails}>{details || '—'}</div>
      </div>
      <CompanyLabelBadge label={data.badge} />
    </div>
  );
};

const CustomSingleValue = (props) => {
  const { data } = props;

  return (
    <components.SingleValue {...props}>
      <div className={s.singleValue}>
        <div className={s.companyInfo}>
          <span className={s.companyName}>{data.label}</span>
          <span className={s.companyDetails}>
            {data.inn !== '0' && data.inn && `ИНН ${data.inn}`}
            {data.kpp !== '0' && data.kpp && ` КПП ${data.kpp}`}
          </span>
        </div>
        <CompanyLabelBadge label={data.badge} />
      </div>
    </components.SingleValue>
  );
};
const CustomNoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      <div className={s.noOptionsMessage}>По вашему запросу ничего не найдено</div>
    </components.NoOptionsMessage>
  );
};

const Combobox = ({ className, options, value, onChange, hasError = false }) => {
  const [inputValue, setInputValue] = useState('');
  const selectRef = useRef(null);

  const handleChange = (option) => {
    onChange(option);
    setInputValue('');
  };

  const handleInputChange = (value, { action }) => {
    if (action !== 'input-blur' && action !== 'menu-close') {
      setInputValue(value);
    }
  };
  const handleMenuClose = () => {
    setInputValue('');
  };

  return (
    <div className={classNames(s.root, className)} onMouseDown={(e) => e.stopPropagation()}>
      <Select
        ref={selectRef}
        options={options}
        value={value}
        onChange={handleChange}
        filterOption={(option, inputValue) =>
          option.data.label.toLowerCase().includes(inputValue.toLowerCase()) ||
          option.data.inn.toLowerCase().includes(inputValue.toLowerCase())
        }
        placeholder=""
        styles={getCustomStyles(hasError)}
        isSearchable
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onMenuClose={handleMenuClose}
        components={{
          Option: CustomOption,
          SingleValue: CustomSingleValue,
          NoOptionsMessage: CustomNoOptionsMessage,
        }}
      />
      <div className={classNames(s.error, { [s.active]: hasError })}>
        <IconWarning className={s.icon} />
        Плательщик не определен
      </div>
    </div>
  );
};

export default Combobox;
