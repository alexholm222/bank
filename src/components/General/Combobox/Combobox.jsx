import React, { useState } from "react";
import Select from "react-select";

//icons
import { ReactComponent as IconWarning } from "assets/icons/iconWarning.svg";

//styles
import s from "./Combobox.module.scss";

const options = [
  { value: "passport", label: "Паспорт" },
  { value: "med_book", label: "Мед. книжка" },
  { value: "patent", label: "Патент" },
];

const customStyles = {
  control: (base, state) => ({
    ...base,
    width: "100%",
    backgroundColor: "#fff",
    borderColor: state.isFocused ? " #002cfb" : "#e0e5f2",

    borderRadius: "6px",
    padding: "2px 4px",
    minHeight: "38px",
    "&:hover": {
      borderColor: "#b0c2e0",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#98a0af",
    fontSize: "14px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#121922",
    fontSize: "14px",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "6px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    marginTop: "4px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#f0f6ff" : "#fff",
    color: "#121922",
    padding: "10px 12px",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#e6f0ff",
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#002CFB",
    padding: "4px",
    "&:hover": {
      color: "#2e6fd8",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const Combobox = ({ className }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const hasError = !selectedOption;

  return (
    <div className={className}>
      <Select
        options={options}
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
