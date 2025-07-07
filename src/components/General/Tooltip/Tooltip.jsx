import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import s from './Tooltip.module.scss';

const Tooltip = ({ open, text, maxWidth, top, left }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className={classNames(s.root, open && s.root_open)}
      style={{
        maxWidth: `${maxWidth}px`,
        position: 'absolute',
        top,
        left,
        zIndex: 9999,
      }}
    >
      <p>{text}</p>
    </div>,
    document.body
  );
};

export default Tooltip;
