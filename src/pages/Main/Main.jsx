import Transaction from 'components/Transaction/Transaction';

import s from './Main.module.scss';

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

const Main = () => {
  return (
    <div className={s.root}>
      <Transaction data={mockData} />
    </div>
  );
};

export default Main;
