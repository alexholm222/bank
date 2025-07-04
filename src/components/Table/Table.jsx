import React from 'react';
import classNames from 'classnames';

import s from './Table.module.scss';
import TableSceleton from 'components/TableSceleton/TableSceleton';

const Table = ({ type, list, anim, isFetch, handler }) => {
  if (isFetch) {
    return <TableSceleton isLoading={isFetch} />;
  }

  const getHeader = () => {
    if (type === 1) {
      return (
        <tr>
          <th style={{ width: '80px' }}>Дата</th>
          <th style={{ width: '80px' }}>Номер</th>
          <th style={{ width: '160px' }}>Сумма, ₽</th>
          <th style={{ minWidth: '230px' }}>Плательщик</th>
          <th style={{ minWidth: '230px' }}>Получатель</th>
          <th style={{ minWidth: '390px' }}>Назначение</th>
          <th style={{ minWidth: '180px' }}>Вид</th>
        </tr>
      );
    }
    if (type === 2) {
      return (
        <tr>
          <th style={{ minWidth: '130px' }}>Поступил</th>
          <th style={{ minWidth: '200px' }}>Компания</th>
          <th style={{ minWidth: '120px' }}>Счет</th>
          <th style={{ minWidth: '150px' }}>Файл</th>
          <th style={{ minWidth: '180px' }}>Кто загрузил</th>
        </tr>
      );
    }
    if (type === 3) {
      return (
        <tr>
          <th style={{ minWidth: '200px' }}>Банк</th>
          <th style={{ minWidth: '120px' }}>БИК</th>
          <th style={{ minWidth: '150px' }}>Корр. счет</th>
          <th style={{ minWidth: '150px' }}>Расчетный счет</th>
          <th style={{ minWidth: '200px' }}>Компания</th>
          <th style={{ minWidth: '120px' }}>Добавлен</th>
          <th style={{ minWidth: '200px' }}>
            Контрагенты <span title="Инфо">ⓘ</span>
          </th>
        </tr>
      );
    }
  };

  const renderRow = (row) => {
    if (type === 1) {
      return (
        <>
          <td>01.07.20</td>
          <td>123456</td>
          <td>
            {' '}
            <AmountCell amount={row.amount} />
          </td>
          <td>{row.payer.name}</td>
          <td>{row.receiver.name}</td>
          <td>{row.description}</td>
          <td>{row.transactionType}</td>
        </>
      );
    }
    if (type === 2) {
      return (
        <>
          <td>02.07.20</td>
          <td>{row.payer.name}</td>
          <td>115678</td>
          <td>Документ.pdf</td>
          <td>Менеджер Иванов</td>
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
          <td>{row.receiver.name}</td>
        </>
      );
    }
  };

  return (
    <table className={classNames(s.root, anim && s.root_anim, isFetch && s.root_fetch)}>
      <thead>{getHeader()}</thead>
      <tbody>
        {list.map((row, index) => (
          <tr key={index} className={s.dataRow} onClick={() => handler(row)}>
            {renderRow(row)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

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
