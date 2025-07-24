import React, { useRef, useState } from 'react';
import Select, { components } from 'react-select';
import classNames from 'classnames';

// icons
import { ReactComponent as IconWarning } from 'assets/icons/iconWarning.svg';
import { ReactComponent as IconChevronDown } from 'assets/icons/iconChewron.svg';

// styles
import s from './Combobox.module.scss';

import customStyles from './selectCustomStyles';
import getCustomStyles from './selectCustomStyles';

// const CustomDropdownIndicator = (props) => {
//   return (
//     <components.DropdownIndicator {...props}>
//       <IconChevronDown className={s.dropdownIcon} />
//     </components.DropdownIndicator>
//   );
// };

const CustomOption = (props) => {
  const { data, innerRef, innerProps, isFocused } = props;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={classNames(s.option, { [s.focused]: isFocused })}
    >
      <div className={s.labelBlock}>
        <div className={s.label}>
          {data.name}
          <div className={s.details}>
            {data.inn !== '0' && data.inn && `ИНН ${data.inn}`}
            {data.kpp !== '0' && data.kpp && `КПП ${data.kpp}`}
            {data.ogrnip !== '0' && data.ogrnip && `ОГРНИП ${data.ogrnip}`}
          </div>
        </div>
      </div>
      {data.label && (
        <div className={s.labelBadge}>
          <span className={s.labelText}>{data.label}</span>
        </div>
      )}
    </div>
  );
};

const CustomSingleValue = (props) => {
  const { data } = props;

  return (
    <components.SingleValue {...props}>
      <div className={s.singleValue}>
        <span className={s.label}>{data.name}</span>
        <span className={s.details}>
          {data.inn !== '0' && data.inn && `ИНН ${data.inn}`}
          {data.kpp !== '0' && data.kpp && `КПП ${data.kpp}`}
        </span>
        {data.label && <div>{data.label}</div>}
      </div>
    </components.SingleValue>
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

  const handleWrapperClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={classNames(s.root, className)} onMouseDown={(e) => e.stopPropagation()}>
      <div onClick={handleWrapperClick}>
        <Select
          ref={selectRef}
          options={options}
          value={value}
          onChange={handleChange}
          placeholder=""
          styles={getCustomStyles(hasError)}
          isSearchable
          inputValue={inputValue}
          onInputChange={handleInputChange}
          components={{
            Option: CustomOption,
            SingleValue: (props) => <CustomSingleValue {...props} />,
            // DropdownIndicator: CustomDropdownIndicator,
          }}
        />
      </div>
      <div className={classNames(s.error, { [s.active]: hasError })}>
        <IconWarning className={s.icon} />
        Обязательное поле
      </div>
    </div>
  );
};
export default Combobox;
