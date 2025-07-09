import React from 'react';
import classNames from 'classnames';
import s from './UniButton.module.scss';
import LoaderButton from 'components/General/UniButton/LoaderButton/LoaderButton';

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
  isLoading = false,
  loaderColor = '#002CFB',
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
      disabled={disabled || isLoading}
    >
      {children ? (
        children
      ) : (
        <>
          <div className={classNames(s.loader, isLoading && s.loader_visible)}>
            <LoaderButton color={loaderColor} />
          </div>

          {Icon && !isLoading && <Icon className={s.icon} />}

          <span className={classNames(isLoading && s.text_hidden)}>{text}</span>
        </>
      )}
    </button>
  );
};

export default UniButton;
