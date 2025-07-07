import React, { useState, useRef } from 'react';
import Select, { components } from 'react-select';

// icons
import { ReactComponent as IconWarning } from 'assets/icons/iconWarning.svg';

// styles
import s from './Combobox.module.scss';
import customStyles from './selectCustomStyles';
import classNames from 'classnames';

const Combobox = ({ className, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const selectRef = useRef(null);

  const handleChange = (option) => {
    setSelectedOption(option);
    setInputValue('');
    setIsEditing(false);
  };

  const handleInputChange = (value, { action }) => {
    if (action !== 'input-blur' && action !== 'menu-close') {
      setInputValue(value);
    }
  };

  const handleWrapperClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  const hasError = !selectedOption;

  return (
    <div className={classNames(s.root, className)}>
      <div onClick={handleWrapperClick}>
        <Select
          ref={selectRef}
          options={options}
          value={selectedOption}
          onChange={handleChange}
          placeholder="Введите город или код"
          styles={customStyles}
          isSearchable
          inputValue={isEditing ? inputValue : ''}
          onInputChange={handleInputChange}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          isEditing={isEditing}
          components={{
            Option: CustomOption,
            SingleValue: (props) => (!isEditing ? <CustomSingleValue {...props} /> : null),
          }}
        />
      </div>
      {hasError && (
        <div className={s.error}>
          <IconWarning className={s.icon} />
          Обязательное поле
        </div>
      )}
    </div>
  );
};

export default Combobox;

const CustomOption = (props) => {
  const { data, innerRef, innerProps, isFocused } = props;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        padding: '12px 16px',
        backgroundColor: isFocused ? '#F0F4FF' : 'white',
        cursor: 'pointer',
      }}
    >
      <div style={{ fontWeight: 500, marginBottom: 4 }}>{data.label}</div>
      <div style={{ color: '#6A7B92', fontSize: 12 }}>
        ИНН {data.inn} {data.kpp && `КПП ${data.kpp}`} {data.ogrnip && `ОГРНИП ${data.ogrnip}`}
      </div>
    </div>
  );
};

const CustomSingleValue = (props) => {
  const { data } = props;

  return (
    <div
      style={{
        padding: '4px 12px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {data.label}
      </span>
      <span
        style={{
          marginLeft: 8,
          color: '#6A7B92',
          fontSize: 12,
          whiteSpace: 'nowrap',
        }}
      >
        ИНН {data.inn} {data.kpp && `КПП ${data.kpp}`}
      </span>
    </div>
  );
};
