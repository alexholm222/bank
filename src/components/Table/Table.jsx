import React, { useState } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';
// Hooks
import { useModal } from 'hooks/useModal';
// Components
import DownloadButton from 'components/General/DownloadButton/DownloadButton';
import Tooltip from 'components/General/Tooltip/Tooltip';
import TableSceleton from 'components/TableSceleton/TableSceleton';
// Icons
import { ReactComponent as IconClose } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconCloseRed } from 'assets/icons/iconCloseRed.svg';
import { ReactComponent as IconCopy } from 'assets/icons/iconCopy.svg';
import { ReactComponent as IconInfo } from 'assets/icons/iconInfo.svg';
// Styles
import s from './Table.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const mockData = {
  payer: {
    name: 'Рога и копыта ООО',
    inn: '123456789',
    kpp: '',
    bank: 'Модуль банк АО',
    bik: '123456789',
    correspondentAccount: '40702810680060657001',
    accountNumber: '40702810680060657001',
  },
  receiver: {
    name: 'Скилла Инновации ООО',
    inn: '123456789',
    kpp: '123456789',
    bank: 'Модуль банк АО',
    bik: '123456789',
    correspondentAccount: '40702810680060657001',
    accountNumber: '40702810680060657001',
  },
  amount: '12 345.60',
  transactionType: 'Входящая',
  paymentType: '-',
  description:
    'Поступил платеж от компании ООО “Агро 34” по счету лдотлоолиолимммммммммммммммммммммммммммммммммммммммммммммм',
};
const Table = ({ type, list, anim, isFetch }) => {
  const { showModal } = useModal();

  const handlerOpenFlow = () => {
    if (type === 1) {
      showModal('TRANSACTION', { data: mockData });
      console.log('Click1');
    }
    if (type === 2) {
      showModal('EXTRACTION', { data: mockData });
      console.log('Click2');
    }
    if (type === 3) {
      showModal('ACCOUNT_INFO', { data: mockData });
      console.log('Click3');
    }
  };
  const handleDownloadExtraction = () => {}; //handleDownloadExtraction
  // const handleRowClick = () => {
  //   openFlow();
  //   console.log('Click');
  // };

  const handleDeleteTransaction = (id, e) => {
    e.stopPropagation();
    console.log('Удалить транзакцию с id:', id);
  };

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
          <th style={{ minWidth: '230px' }}>Назначение</th>
          <th style={{ minWidth: '180px' }}>Вид</th>
          <th style={{ minWidth: '50px' }}></th>
        </tr>
      );
    }
    if (type === 2) {
      return (
        <tr>
          <th style={{ width: '160px' }}>Поступил</th>
          <th style={{ minWidth: '270px' }}>Компания</th>
          <th style={{ minWidth: '300px' }}>Счет</th>
          <th style={{ width: '120px' }}>Файл</th>
          <th style={{ minWidth: '250px' }}>Кто загрузил</th>
          <th style={{ width: '120px' }}></th>
          <th style={{ width: '180px' }}></th>
        </tr>
      );
    }
    if (type === 3) {
      return (
        <tr>
          <th style={{ width: '250px' }}>Банк</th>
          <th style={{ width: '120px' }}>БИК</th>
          <th style={{ width: '210px' }}>Корр. счет</th>
          <th style={{ width: '210px' }}>Расчетный счет</th>
          <th style={{ minWidth: '200px' }}>Компания</th>
          <th style={{ width: '100px' }}>Добавлен</th>
          <th style={{ width: '140px', position: 'relative' }} className={s.contrAgents}>
            Контрагенты{' '}
            <Tooltip
              text="Количество контрагентов, у которых выбран данный счет в качестве основного"
              maxWidth={400}
            >
              <IconInfo />
            </Tooltip>
          </th>
          <th style={{ width: '90px' }}></th>
          <th style={{ width: '40px' }}></th>
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

  return (
    <table className={classNames(s.root, anim && s.root_anim, isFetch && s.root_fetch)}>
      <thead>{getHeader()}</thead>
      <tbody>
        {list.map((row, index) => (
          <tr key={index} className={s.dataRow} onClick={handlerOpenFlow}>
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

const TagLabel = ({ alert, inactive }) => {
  return (
    <div className={classNames(s.tag, alert && s.tag_red, inactive && s.tag_grey)}>
      {inactive ? 'Неактивен' : alert ? 'Не распознана' : 'Основной'}
    </div>
  );
};
const CopyTextIcon = ({ textToCopy }) => {
  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success('Скопировано в буфер обмена');
    } catch (err) {
      toast.error('Ошибка копирования');
    }
  };

  return (
    <div className={s.wrapper}>
      <button className={s.iconButton} onClick={handleCopy} aria-label="Скопировать">
        <IconCopy className={s.icon} />
      </button>
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
