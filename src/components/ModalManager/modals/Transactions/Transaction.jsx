import React, { useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

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

// Styles
import s from './Transaction.module.scss';

const options = [
  { value: 'passport', label: 'Паспорт' },
  { value: 'med_book', label: 'Мед. книжка' },
  { value: 'patent', label: 'Патент' },
];

const docTypes = ['Оказание услуг', 'Транспортный'];
const incomeTransactionTypes = ['Поступление', 'Возврат'];
// const outcomeTransactionTypes = ['Платеж', 'Возврат'];

const Transaction = () => {
  const { modalProps, hideModal } = useModal();
  const [incomeType, setIncomeType] = useState(incomeTransactionTypes[0]);
  const [docType, setDoctype] = useState(docTypes[0]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [openCalendar, setOpenCalendar] = useState(false);
  const { data } = modalProps || {};
  const number = 123344;
  const date = '12.12.2022';

  return (
    <Modal isOpen={true} onClose={hideModal}>
      <div className={s.modal}>
        <div className={s.modal_header}>
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
              <DataPickerCalendar
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

          <Combobox className={s.combobox} options={[{ value: 'passport', label: 'Паспорт' }]} />

          <div className={s.control}>
            <Dropdown
              options={['Оказание услуг', 'Транспортный']}
              value={docType}
              style={{ width: '200px' }}
              onChange={setDoctype}
            />
            <Combobox className={s.combobox} />
          </div>

          <div className={s.control_btn}>
            <ButtonSecond
              type="red"
              Icon={IconDeleteRed}
              buttonText="Удалить"
              handler={() => console.log('delete')}
            />
            <Button
              width={314}
              type="right"
              Icon={IconDoneWhite}
              buttonText="Сохранить"
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
