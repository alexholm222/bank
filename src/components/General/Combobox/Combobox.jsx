import React, { useState } from 'react';
import Select from 'react-select';

//icons
import { ReactComponent as IconWarning } from 'assets/icons/iconWarning.svg';

//styles
import s from './Combobox.module.scss';

import customStyles from './selectCustomStyles';

const Combobox = ({ className, data }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const hasError = !selectedOption;

  return (
    <div className={className}>
      <Select
        options={data}
        value={selectedOption}
        onChange={setSelectedOption}
        placeholder="Выберите документ"
        styles={customStyles}
        isSearchable={true}
      />
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
