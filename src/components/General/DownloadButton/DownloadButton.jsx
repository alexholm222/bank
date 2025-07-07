import React from 'react';
import s from './DownloadButton.module.scss';
import { ReactComponent as IconDocument } from 'assets/icons/iconDocument.svg'; // Замени на свой SVG-иконку

const DownloadButton = ({ onClick, text = 'Скачать' }) => {
  return (
    <button className={s.button} onClick={onClick}>
      <IconDocument className={s.icon} />
      <span className={s.text}>{text}</span>
    </button>
  );
};

export default DownloadButton;
