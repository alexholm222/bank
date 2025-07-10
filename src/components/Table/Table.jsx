import React from 'react';

import classNames from 'classnames';
// Hooks
import { useModal } from 'hooks/useModal';

import TableSceleton from 'components/TableSceleton/TableSceleton';
// Icons

// Styles
import s from './Table.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import TableRow from './TableRow';
import TableHeader from './TableHeader';

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
    }
    if (type === 2) {
      showModal('EXTRACTION', { data: mockData });
    }
    if (type === 3) {
      showModal('ACCOUNT_INFO', { data: mockData });
    }
  };

  if (isFetch) {
    return <TableSceleton isLoading={isFetch} />;
  }

  return (
    <table className={classNames(s.root, anim && s.root_anim, isFetch && s.root_fetch)}>
      <thead>{TableHeader({ type })}</thead>
      <tbody>
        {list.map((row, index) => (
          <tr key={index} className={s.dataRow} onClick={handlerOpenFlow}>
            {TableRow({ row, type })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
