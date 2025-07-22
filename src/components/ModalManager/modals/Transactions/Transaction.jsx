import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

// Hooks
import { useModal } from 'hooks/useModal';

// Redux
import { useGetTransactionQuery } from '../../../../redux/services/transactionsApi';

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
import { useSelector } from 'react-redux';

// const incomeTransactionTypes = ['Поступление', 'Возврат'];
const incomeTransactionTypes = {
  income: 'Поступление',
  outcome: 'Возврат',
};
const docTypes = ['Оказание услуг', 'Транспортный'];

const Transaction = ({ id }) => {
  const companieslist = useSelector((state) => state.companiesList.companies) ?? [];
  const partnershipslist = useSelector((state) => state.companiesList.companies) ?? [];
  const { hideModal } = useModal();
  const { data, isLoading } = useGetTransactionQuery({ id });
  const [transaction, setTransaction] = useState(null);
  const [incomeType, setIncomeType] = useState(null);
  const [docType, setDoctype] = useState(docTypes[0]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [openCalendar, setOpenCalendar] = useState(false);
  const companyOptions = companieslist.map((company) => ({
    value: company.id,
    label: company.name,
    inn: company.inn,
    kpp: company.kpp,
    ogrnip: company.ogrnip,
  }));

  console.log(incomeType);
  useEffect(() => {
    if (data) {
      setTransaction(data);
      setIncomeType(incomeTransactionTypes[data.type]);
    }
  }, [data]);
  if (!transaction) return null;

  return (
    <Modal isOpen onClose={hideModal}>
      <div className={s.modal}>
        <header className={s.modalHeader}>
          <div className={s.title}>
            <h3>{`Транзакция ${transaction.number} от ${transaction.date}`}</h3>
          </div>
          <button className={s.close} onClick={hideModal}>
            <IconCloseBlack />
          </button>
        </header>

        <section className={s.body}>
          <PaymentDetails
            payer={transaction.partnership}
            receiver={transaction.company}
            data={transaction}
          />
        </section>

        <footer className={s.controlSection}>
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
              options={Object.values(incomeTransactionTypes)}
              value={incomeType}
              style={{ width: '200px' }}
              onChange={setIncomeType}
            />
          </div>

          <div className={s.control}>
            <Combobox className={s.combobox} options={companyOptions} />
          </div>

          <div className={s.control_btn}>
            <UniButton
              width={120}
              iconPosition="right"
              type="danger"
              icon={IconDeleteRed}
              text="Удалить"
              handler={() => {}}
            />
            <UniButton
              iconPosition="right"
              width={314}
              type="primary"
              icon={IconDoneWhite}
              text="Сохранить"
              handler={() => {}}
            />
          </div>
        </footer>

        <div className={s.footer}></div>
      </div>
    </Modal>
  );
};

export default Transaction;

const PaymentDetails = ({ payer, receiver, data }) => {
  const isSummaryFirst = data?.type === 'income';

  const fields = [
    ['Наименование', 'name'],
    ['ИНН', 'inn'],
    ['КПП', 'kpp'],
    ['Банк', 'bank'],
    ['БИК', 'bik'],
    ['Корр. счет', 'ks'],
    ['Расчетный счет', 'rs'],
  ];

  const summaryData = [
    ['Сумма', data?.sum],
    ['Тип транзакции', data?.type === 'income' ? 'Поступление' : 'Возврат'],
    ['Вид', data?.kind],
    ['Назначение', data?.goal],
  ];

  const renderSummaryBlock = () => (
    <div className={s.paymentSummary}>
      <div className={s.sectionSubtitle}>Детали платежа из выписки</div>
      {summaryData.map(([label, value], index) => (
        <div key={index} className={s.paymentsRow}>
          <div className={s.paymentsLabel}>{label}</div>
          <div className={s.content}>{value?.toString().trim() || '-'}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={s.paymentDetails}>
      {isSummaryFirst && renderSummaryBlock()}

      <div className={classNames(s.row, s.gridHeader)}>
        <div></div>
        <div>Плательщик</div>
        <div>Получатель</div>
      </div>

      <div className={s.gridInfo}>
        {fields.map(([label, key], index) => (
          <div key={index} className={s.row}>
            <div className={s.label}>{label}</div>
            <div>{payer?.[key]?.toString().trim() || '-'}</div>
            <div>{receiver?.[key]?.toString().trim() || '-'}</div>
          </div>
        ))}
      </div>

      {!isSummaryFirst && renderSummaryBlock()}
    </div>
  );
};
