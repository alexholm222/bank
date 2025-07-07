import React from 'react';
import classNames from 'classnames';

import s from './UniButton.module.scss';

const UniButton = ({
  className = '',
  style = {},
  type = 'primary', // primary, outline, danger
  iconPosition = 'left', // left, right
  icon: Icon,
  text,
  width,
  height,
  children,
  onClick,
  disabled = false,
}) => {
  const buttonStyle = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
    ...style,
  };

  return (
    <button
      className={classNames(
        s.button,
        s[`button_${type}`],
        s[`icon_${iconPosition}`],
        disabled && s.button_disabled,
        className
      )}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {children ? (
        children
      ) : (
        <>
          {Icon && <Icon className={s.icon} />}
          <span>{text}</span>
        </>
      )}
    </button>
  );
};
export default UniButton;
