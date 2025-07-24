import classNames from 'classnames';
import LoaderButton from 'components/General/UniButton/LoaderButton/LoaderButton';

import s from './UniButton.module.scss';

const UniButton = ({
  className = '',
  style = {},
  type = 'primary', // primary | outline | danger
  iconPosition = 'left', // left | right
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
    ...(width && { width: `${width}px` }),
    ...(height && { height: `${height}px` }),
    ...style,
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={classNames(
        s.button,
        s[`button_${type}`],
        s[`icon_${iconPosition}`],
        { [s.button_disabled]: isDisabled },
        className
      )}
      style={buttonStyle}
      onClick={(e) => onClick?.(e)}
      disabled={isDisabled}
    >
      {children ? (
        children
      ) : (
        <>
          {/* Loader */}
          <div className={classNames(s.loader, { [s.loader_visible]: isLoading })}>
            <LoaderButton color={loaderColor} />
          </div>

          {/* Icon */}
          {Icon && !isLoading && <Icon className={s.icon} />}

          {/* Text */}
          <span className={classNames({ [s.text_hidden]: isLoading })}>{text}</span>
        </>
      )}
    </button>
  );
};

export default UniButton;
