import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

// Hooks
import { useModal } from 'hooks/useModal';
import useDeleteTransaction from 'hooks/useDeleteTransaction';

// Redux
import {
  useGetTransactionQuery,
  useUpdateTransactionMutation,
} from '../../../../redux/services/transactionsApi';
import { useSelector } from 'react-redux';

// Components
import Combobox from 'components/General/Combobox/Combobox';
import DateInput from 'components/General/DateInput/DateInput';
import DatePickerCalendar from 'components/General/DatePickerCalendar/DatePickerCalendar';
import Dropdown from 'components/General/Dropdown/Dropdown';
import Modal from 'components/General/Modal/Modal';
import UniButton from 'components/General/UniButton/UniButton';
import PaymentDetails from './PaymentsDetails';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconDeleteRed } from 'assets/icons/iconDeleteRed.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';

// Styles
import s from './Transaction.module.scss';

const transactionTypeMap = {
  income: 'Поступление',
  refund_income: 'Возврат поступления',
  outcome: 'Платеж',
  refund_outcome: 'Возврат платежа',
};

const typeGroups = {
  income: ['income', 'refund_income'],
  outcome: ['outcome', 'refund_outcome'],
};

const getKeyByValue = (obj, value) => Object.keys(obj).find((key) => obj[key] === value);

const Transaction = ({ id }) => {
  const { hideModal } = useModal();
  const [updateTransaction] = useUpdateTransactionMutation();
  const { data } = useGetTransactionQuery({ id });
  const companies = useSelector((state) => state.companiesList.companies) ?? [];
  const handleDeleteTransaction = useDeleteTransaction();
  const [transaction, setTransaction] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [transactionType, setTransactionType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [hasValidationError, setHasValidationError] = useState(false);
  // const [payer, setPayer] = useState(null);
  // const [receiver, setReceiver] = useState(null);
  const typeKey = getKeyByValue(transactionTypeMap, transactionType);
  const isIncome = typeKey === 'income' || typeKey === 'refund_outcome';
  const company = useMemo(
    () => ({
      name: data?.company_name,
      inn: data?.inn,
      kpp: data?.kpp,
      bank: data?.bank,
      bik: data?.bik,
      ks: data?.ks,
      rs: data?.rs,
    }),
    [data]
  );
  const payer = !isIncome ? data?.partnership : company;
  const receiver = !isIncome ? company : data?.partnership;

  const companyOptions = useMemo(
    () =>
      companies.map((company) => ({
        value: company.id,
        name: company.name,
        label: company.label,
        inn: company.inn,
        kpp: company.kpp,
        ogrnip: company.ogrnip,
      })),
    [companies]
  );

  const isIncomeType = useMemo(
    () => transactionType === 'income' || transactionType === 'refund_outcome',
    [transactionType]
  );

  const transactionTypeOptions = useMemo(() => {
    if (!data) return [];
    const group = isIncomeType ? typeGroups.income : typeGroups.outcome;
    return group.map((key) => transactionTypeMap[key]);
  }, [data, isIncomeType]);

  useEffect(() => {
    const company = companyOptions.find((c) => c.value === selectedCompanyId) ?? null;
    setSelectedCompany(company);
  }, [selectedCompanyId, companyOptions]);

  useEffect(() => {
    if (!data) return;
    setSelectedCompanyId(data?.company_id ?? null);
    setTransaction(data);
    setSelectedDate(dayjs(data.date, 'DD.MM.YYYY'));
    setTransactionType(transactionTypeMap[data.type]);
    // setPayer(isIncomeType ? data.partnership : company);
    // setReceiver(isIncomeType ? company : data.partnership);
  }, [data]);

  const handleUpdateTransaction = () => {
    const isInvalid = !selectedCompanyId || !transactionType || !selectedDate;
    if (isInvalid) {
      setHasValidationError(true);
      return;
    }
    setHasValidationError(false);

    const typeKey = getKeyByValue(transactionTypeMap, transactionType);
    if (!typeKey) return;

    const payload = {
      date: selectedDate.format('DD.MM.YYYY'),
      type: typeKey,
      company_id: selectedCompanyId,
    };

    updateTransaction({ id: transaction.id, data: payload })
      .unwrap()
      .then(hideModal)
      .catch(console.error);
  };

  if (!transaction) return null;

  // const company = {
  //   name: transaction?.company_name,
  //   inn: transaction?.inn,
  //   kpp: transaction?.kpp,
  //   bank: transaction?.bank,
  //   bik: transaction?.bik,
  //   ks: transaction?.ks,
  //   rs: transaction?.rs,
  // };

  return (
    <Modal onClose={hideModal}>
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
          <PaymentDetails payer={payer} receiver={receiver} data={transaction} />
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
              options={transactionTypeOptions}
              value={transactionType}
              style={{ width: '240px' }}
              onChange={setTransactionType}
            />
          </div>

          <div>
            <Combobox
              hasError={hasValidationError}
              value={selectedCompany}
              className={s.combobox}
              options={companyOptions}
              onChange={(option) => setSelectedCompanyId(option.value)}
            />
          </div>

          <div className={s.control_btn}>
            <UniButton
              width={120}
              iconPosition="right"
              type="danger"
              icon={IconDeleteRed}
              text="Удалить"
              onClick={(e) => handleDeleteTransaction(transaction.id, e)}
            />
            <UniButton
              iconPosition="right"
              width={314}
              type="primary"
              icon={IconDoneWhite}
              text="Сохранить"
              onClick={handleUpdateTransaction}
            />
          </div>
        </footer>

        <div className={s.footer}></div>
      </div>
    </Modal>
  );
};

export default Transaction;
