import React, { useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

// Hooks
import { useModal } from 'hooks/useModal';

// Components
import Combobox from 'components/General/Combobox/Combobox';
import DateInput from 'components/General/DateInput/DateInput';
import DatePickerCalendar from 'components/General/DatePickerCalendar/DatePickerCalendar';
import Dropdown from 'components/General/Dropdown/Dropdown';
import Modal from 'components/General/Modal/Modal';
import UniButton from 'components/General/UniButton/UniButton';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconDeleteRed } from 'assets/icons/iconDeleteRed.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';

// Styles
import s from './Transaction.module.scss';

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
    label: 'Очень длинное название Скилла Инновации dddddddddddddddddddddddddddddООО',
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

const Transaction = ({ data }) => {
  console.log(data);
  const { modalProps, hideModal } = useModal();
  const [incomeType, setIncomeType] = useState(incomeTransactionTypes[0]);
  const [docType, setDoctype] = useState(docTypes[0]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [openCalendar, setOpenCalendar] = useState(false);
  const { company, date, goal, id, kind, number, partnership, requires_action, sum, type } = data;

  return (
    <Modal isOpen={true} onClose={hideModal}>
      <div className={s.modal}>
        <div className={s.modalHeader}>
          <div className={s.title}>
            <h3>{`Транзакция ${number} от ${date}`}</h3>
          </div>
          <button className={s.close} onClick={hideModal}>
            <IconCloseBlack />
          </button>
        </div>

        <div className={s.body}>
          <PaymentDetails data={data} />
        </div>

        <div className={s.controlSection}>
          <div className={s.control}>
            <DateInput selectedDate={selectedDate} setOpenCalendar={setOpenCalendar} />
            {openCalendar && (
              <DatePickerCalendar
                value={selectedDate}
                setValue={setSelectedDate}
                setOpenCalendar={setOpenCalendar}
                nosub={false}
              />
            )}
            <Dropdown
              options={['Поступление', 'Возврат']}
              value={incomeType}
              style={{ width: '200px' }}
              onChange={setIncomeType}
            />
          </div>

          <Combobox className={s.combobox} options={data1} />

          <div className={s.control}>
            <Dropdown
              options={['Оказание услуг', 'Транспортный']}
              value={docType}
              style={{ width: '200px' }}
              onChange={setDoctype}
            />
            <Combobox className={s.combobox} options={{}} />
          </div>

          <div className={s.control_btn}>
            <UniButton
              width={120}
              iconPosition="right"
              type="danger"
              icon={IconDeleteRed}
              text="Удалить"
              handler={() => console.log('delete')}
            />
            <UniButton
              iconPosition="right"
              width={314}
              type="primary"
              icon={IconDoneWhite}
              text="Сохранить"
              handler={() => console.log('save')}
            />
          </div>
        </div>
      </div>
      <div className={s.footer}></div>
    </Modal>
  );
};

export default Transaction;

const PaymentDetails = ({ data }) => {
  const { payer, receiver, amount, transactionType, paymentType, description } = data;

  const isSummaryFirst = true;

  const renderFields = (entity) =>
    [
      entity?.name,
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

  const labels = ['Наименование', 'ИНН', 'КПП', 'Банк', 'БИК', 'Корр. счет', 'Расчетный счет'];

  return (
    <div className={s.paymentDetails}>
      {isSummaryFirst && summaryBlock}

      <div className={s.sectionHeader}>
        <div className={s.headerTitle}>Плательщик</div>
        <div className={s.headerTitle}>Получатель</div>
      </div>

      <div className={s.detailsGrid}>
        <div className={s.column}>
          {labels.map((label, index) => (
            <div key={index} className={s.row}>
              <div className={s.label}>{label}</div>
            </div>
          ))}
        </div>
        <div className={classNames(s.column, s.payer)}>{renderFields(payer)}</div>
        <div className={s.column}>{renderFields(receiver)}</div>
      </div>

      {!isSummaryFirst && summaryBlock}
    </div>
  );
};
