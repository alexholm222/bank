import React, { useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// Hooks
import { useModal } from 'hooks/useModal';

// Components
import Button from 'components/General/Button/Button';
import ButtonSecond from 'components/General/ButtonSecond/ButtonSecond';
import Combobox from 'components/General/Combobox/Combobox';
import DataPickerCalendar from 'components/General/DataPickerCalendar/DataPickerCalendar';
import DateInput from 'components/General/DateInput/DateInput';
import Dropdown from 'components/General/Dropdown/Dropdown';
import Modal from 'components/General/Modal/Modal';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconDeleteRed } from 'assets/icons/iconDeleteRed.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as EyeRed } from 'assets/icons/eyeRed.svg';
import { ReactComponent as IconCopyWhite } from 'assets/icons/iconCopyWhite.svg';
import { ReactComponent as RowBlue } from 'assets/icons/rowBlue.svg';

// Styles
import s from './AccountInfo.module.scss';
import UniButton from 'components/General/UniButton/UniButton';

const options = [
  { value: 'passport', label: 'Паспорт' },
  { value: 'med_book', label: 'Мед. книжка' },
  { value: 'patent', label: 'Патент' },
];
const data1 = [
  { value: '1', label: 'Рога и копыта ООО', inn: '123456789', kpp: '123456789' },
  {
    value: '2',
    label: 'Шабашкин Александр Сергеевич ИП',
    inn: '4363464777',
    ogrnip: '102773964228146',
  },
  {
    value: '3',
    label: 'Очень длинное название Скилла Инновации ООО',
    inn: '4703170282',
    kpp: '780601001',
  },
  { value: '1', label: 'Рога и копыта ООО', inn: '123456789', kpp: '123456789' },
  {
    value: '2',
    label: 'Шабашкин Александр Сергеевич ИП',
    inn: '4363464777',
    ogrnip: '102773964228146',
  },
  {
    value: '3',
    label: 'Очень длинное название Скилла Инновации ООО',
    inn: '4703170282',
    kpp: '780601001',
  },
  { value: '1', label: 'Рога и копыта ООО', inn: '123456789', kpp: '123456789' },
  {
    value: '2',
    label: 'Шабашкин Александр Сергеевич ИП',
    inn: '4363464777',
    ogrnip: '102773964228146',
  },
  {
    value: '3',
    label: 'Очень длинное название Скилла Инновации ООО',
    inn: '4703170282',
    kpp: '780601001',
  },
  { value: '1', label: 'Рога и копыта ООО', inn: '123456789', kpp: '123456789' },
  {
    value: '2',
    label: 'Шабашкин Александр Сергеевич ИП',
    inn: '4363464777',
    ogrnip: '102773964228146',
  },
  {
    value: '3',
    label: 'Очень длинное название Скилла Инновации ООО',
    inn: '4703170282',
    kpp: '780601001',
  },
  { value: '1', label: 'Рога и копыта ООО', inn: '123456789', kpp: '123456789' },
  {
    value: '2',
    label: 'Шабашкин Александр Сергеевич ИП',
    inn: '4363464777',
    ogrnip: '102773964228146',
  },
  {
    value: '3',
    label: 'Очень длинное название Скилла Инновации ООО',
    inn: '4703170282',
    kpp: '780601001',
  },
  { value: '1', label: 'Рога и копыта ООО', inn: '123456789', kpp: '123456789' },
  {
    value: '2',
    label: 'Шабашкин Александр Сергеевич ИП',
    inn: '4363464777',
    ogrnip: '102773964228146',
  },
  {
    value: '3',
    label: 'Очень длинное название Скилла Инновации ООО',
    inn: '4703170282',
    kpp: '780601001',
  },
  { value: '1', label: 'Рога и копыта ООО', inn: '123456789', kpp: '123456789' },
  {
    value: '2',
    label: 'Шабашкин Александр Сергеевич ИП',
    inn: '4363464777',
    ogrnip: '102773964228146',
  },
  {
    value: '3',
    label: 'Очень длинное название Скилла Инновации ООО',
    inn: '4703170282',
    kpp: '780601001',
  },
];

const docTypes = ['Оказание услуг', 'Транспортный'];
const incomeTransactionTypes = ['Поступление', 'Возврат'];
// const outcomeTransactionTypes = ['Платеж', 'Возврат'];

const AccountInfo = () => {
  const { modalProps, hideModal, showModal } = useModal();
  const [incomeType, setIncomeType] = useState(incomeTransactionTypes[0]);
  const [docType, setDoctype] = useState(docTypes[0]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [openCalendar, setOpenCalendar] = useState(false);
  const { data } = modalProps || {};
  const number = 123344;
  const date = '12.12.2022';
  const count = 3;
  const handleDoUnactive = () => {
    hideModal();
    showModal('CHANGE_ACCOUNT_DETAIL');
  };

  return (
    <Modal isOpen={true} onClose={hideModal}>
      <div className={s.modal}>
        <div className={s.modal_header}>
          <div className={s.title}>
            <h3>Банковский счет</h3>
          </div>
          <button className={s.close} onClick={hideModal}>
            <IconCloseBlack />
          </button>
        </div>

        <Link to="/counterparties" className={s.link}>
          Связанные контрагенты
          <span className={s.count}>{count}</span>
          <span className={s.arrow}>
            <RowBlue />
          </span>
        </Link>

        <div className={s.body}>
          <PaymentDetails data={data} />
        </div>

        <div className={s.controlSection}>
          <div className={s.controlBtn}>
            <UniButton
              onClick={handleDoUnactive}
              text="Сделать неактивным"
              type="danger"
              iconPosition="right"
              icon={EyeRed}
              width={212}
            />
            <UniButton
              onClick={hideModal}
              text="Копировать реквизиты"
              type="primary"
              iconPosition="right"
              icon={IconCopyWhite}
              width={228}
            />
          </div>
        </div>
      </div>
      <div className={s.footer}></div>
    </Modal>
  );
};

export default AccountInfo;

const PaymentDetails = ({ data }) => {
  const { payer, receiver, amount, transactionType, paymentType, description } = data;

  const isSummaryFirst = true;

  const renderFields = (entity) =>
    [
      entity?.company,
      entity?.inn,
      entity?.kpp,
      entity?.bank,
      entity?.bik,
      entity?.correspondentAccount,
      entity?.accountNumber,
    ].map((value, index) => (
      <div key={index} className={s.row}>
        <div className={s.content}>{value?.toString().trim() ? value : '-'}</div>
      </div>
    ));

  const summaryData = [
    ['Сумма', amount],
    ['Тип транзакции', transactionType],
    ['Вид', paymentType],
    ['Назначение', description],
  ];

  const summaryBlock = (
    <div className={s.paymentSummary}>
      <div className={s.sectionSubtitle}>Детали платежа из выписки</div>
      {summaryData.map(([label, value], index) => (
        <div key={index} className={s.row}>
          <div className={s.label}>{label}</div>
          <div className={s.content}>{value?.toString().trim() ? value : '-'}</div>
        </div>
      ))}
    </div>
  );

  const labels = [
    'Компания',
    'ИНН',
    'КПП',
    'ОГРН',
    'Юр. адрес',
    'Факт. адрес',
    'Руководитель',
    'Банк',
    'БИК',
    'Корр. счет',
    'Расчетный счет',
  ];

  return (
    <div className={s.paymentDetails}>
      <div className={s.detailsGrid}>
        <div className={s.column}>
          {labels.map((label, index) => (
            <div key={index} className={s.row}>
              <div className={s.label}>{label}</div>
            </div>
          ))}
        </div>
        <div className={classNames(s.column, s.payer)}>{renderFields(payer)}</div>
      </div>

      {!isSummaryFirst && summaryBlock}
    </div>
  );
};
