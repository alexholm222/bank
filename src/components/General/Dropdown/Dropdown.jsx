import { useState, useRef, useEffect } from "react";

//icons
import { ReactComponent as IconChevron } from "assets/icons/iconChewron.svg";

//styles
import s from "./Dropdown.module.scss";
import classNames from "classnames";

const Dropdown = ({
  className = "",
  options = [],
  value = "",
  onChange = () => {},
  placeholder = "Выберите категорию",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={classNames(s.wrapper, className)} ref={wrapperRef}>
      <div
        className={s.selectBox}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
      >
        <span
          className={classNames({ [s.value]: value, [s.placeholder]: !value })}
        >
          {value || placeholder}
        </span>

        <IconChevron className={`${s.icon} ${isOpen ? s.open : ""}`} />
      </div>

      {isOpen && (
        <ul className={s.dropdownList}>
          {options.map((option) => (
            <li
              key={option}
              className={`${s.option} ${option === value ? s.selected : ""}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
