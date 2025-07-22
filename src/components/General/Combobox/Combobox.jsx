import React, { useRef, useState } from 'react';
import Select, { components } from 'react-select';
import classNames from 'classnames';

// icons
import { ReactComponent as IconWarning } from 'assets/icons/iconWarning.svg';

// styles
import s from './Combobox.module.scss';

import customStyles from './selectCustomStyles';

const CustomOption = (props) => {
  const { data, innerRef, innerProps, isFocused } = props;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={classNames(s.option, { [s.focused]: isFocused })}
    >
      <div className={s.label}>{data.label}</div>
      <div className={s.details}>
        {data.inn !== '0' && data.inn && `ИНН ${data.inn}`}
        {data.kpp !== '0' && data.kpp && `КПП ${data.kpp}`}
        {data.ogrnip !== '0' && data.ogrnip && `ОГРНИП ${data.ogrnip}`}
      </div>
    </div>
  );
};

const CustomSingleValue = (props) => {
  const { data } = props;

  return (
    <components.SingleValue {...props}>
      <div className={s.singleValue}>
        <span className={s.label}>{data.label}</span>
        <span className={s.details}>
          {data.inn !== '0' && data.inn && `ИНН ${data.inn}`}
          {data.kpp !== '0' && data.kpp && `КПП ${data.kpp}`}
        </span>
      </div>
    </components.SingleValue>
  );
};

const Combobox = ({ className, options, selected }) => {
  const [selectedOption, setSelectedOption] = useState(selected);
  const [inputValue, setInputValue] = useState('');

  const selectRef = useRef(null);

  const handleChange = (option) => {
    setSelectedOption(option);
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

  const hasError = !selectedOption;

  return (
    <div className={classNames(s.root, className)} onMouseDown={(e) => e.stopPropagation()}>
      <div onClick={handleWrapperClick}>
        <Select
          ref={selectRef}
          options={options}
          value={selectedOption}
          onChange={handleChange}
          placeholder=""
          styles={customStyles}
          isSearchable
          inputValue={inputValue}
          onInputChange={handleInputChange}
          components={{
            Option: CustomOption,
            SingleValue: (props) => <CustomSingleValue {...props} />,
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
