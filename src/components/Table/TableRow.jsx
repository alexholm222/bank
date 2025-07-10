import React, { useState } from 'react';
import classNames from 'classnames';

// Components
import DownloadButton from 'components/General/DownloadButton/DownloadButton';

import { ReactComponent as IconClose } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconCloseRed } from 'assets/icons/iconCloseRed.svg';

// Styles
import s from './Table.module.scss';

import CopyTextIcon from './CopyTextIcon';

const AmountCell = ({ amount }) => {
  const isNegative = amount.startsWith('-');
  const cleanedAmount = amount.replace('+', '').replace('-', '');
  const [intPart, decimalPart] = cleanedAmount.split('.');

  return (
    <span>
      <span
        style={{
          color: isNegative ? '#000' : 'green',
        }}
      >
        {isNegative ? '-' : '+'}
        {intPart}
      </span>
      <span style={{ color: '#71869d' }}>.{decimalPart}</span>
    </span>
  );
};
const TagLabel = ({ alert, inactive }) => {
  return (
    <div className={classNames(s.tag, alert && s.tag_red, inactive && s.tag_grey)}>
      {inactive ? 'Неактивен' : alert ? 'Не распознана' : 'Основной'}
    </div>
  );
};

const DeleteTransaction = ({ onClick, id }) => {
  return (
    <div className={s.deleteWrapper}>
      <button className={s.deleteIconButton} aria-label="Удалить" onClick={(e) => onClick(id, e)}>
        <IconClose className={s.deleteIcon} />
        <IconCloseRed className={s.deleteIconRed} />
      </button>
    </div>
  );
};

const TableRow = ({ row, type }) => {
  const handleDeleteTransaction = (id, e) => {
    e.stopPropagation();
    console.log('Удалить транзакцию с id:', id);
  };

  const handleDownloadExtraction = () => {}; //handleDownloadExtraction
  // const handleRowClick = () => {
  //   openFlow();
  //   console.log('Click');
  // };
  if (type === 1) {
    return (
      <>
        <td>01.07.20</td>
        <td>123456</td>
        <td>
          {' '}
          <AmountCell amount={'12233.2'} />
        </td>
        <td>{row.payer.name}</td>
        <td>{row.receiver.name}</td>
        <td className={s.shrinkable}>{row.description}</td>
        <td>{row.transactionType}</td>
        <td className={s.deleteCell}>
          <DeleteTransaction id={row.id} onClick={handleDeleteTransaction} />
        </td>
      </>
    );
  }
  if (type === 2) {
    return (
      <>
        <td>02.07.20 10:00</td>
        <td>{row.payer.name}</td>
        <td>115678</td>
        <td>
          <DownloadButton onClick={handleDownloadExtraction} />
        </td>
        <td>Менеджер Иванов</td>
        <td className={s.grayText}>Бухгалтер</td>
        <td>
          <TagLabel alert={false} inactive={false} />
        </td>
      </>
    );
  }
  if (type === 3) {
    return (
      <>
        {' '}
        <td>{row.payer.bank}</td>
        <td>{row.payer.bik}</td>
        <td>{row.payer.correspondentAccount}</td>
        <td>{row.payer.accountNumber}</td>
        <td>{row.payer.name}</td>
        <td>01.07.2025</td>
        <td>123</td>
        <td>
          <TagLabel alert={false} inactive={true} />
        </td>
        <td>
          <CopyTextIcon
            textToCopy={
              `Банк: ${row.payer.bank}\n` +
              `БИК: ${row.payer.bik}\n` +
              `Корр. счет: ${row.payer.correspondentAccount}\n` +
              `Расчетный счет: ${row.payer.accountNumber}\n` +
              `Компания: ${row.payer.name}`
            }
          />
        </td>
      </>
    );
  }
};
export default TableRow;
