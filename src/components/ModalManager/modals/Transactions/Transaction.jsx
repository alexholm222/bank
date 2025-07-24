import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

// Hooks
import { useModal } from 'hooks/useModal';

// Redux
import {
  useDeleteTransactionMutation,
  useGetTransactionQuery,
  useUpdateTransactionMutation,
} from '../../../../redux/services/transactionsApi';
import { useDispatch, useSelector } from 'react-redux';
import { removeTransactionById } from '../../../../redux/tableData/tableDataSlice';

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
import PaymentDetails from './PaymentsDetails';

// const incomeTransactionTypes = ['Поступление', 'Возврат'];
const incomeTransactionTypes = {
  income: 'Поступление',
  outcome: 'Возврат',
};

const Transaction = ({ id }) => {
  const { hideModal } = useModal();
  const [deleteTransaction] = useDeleteTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();
  const { data } = useGetTransactionQuery({ id });

  const dispatch = useDispatch();
  const companieslist = useSelector((state) => state.companiesList.companies) ?? [];
  // const partnershipslist = useSelector((state) => state.companiesList.companies) ?? [];

  const [transaction, setTransaction] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [incomeType, setIncomeType] = useState(null);
  // const [docType, setDoctype] = useState(docTypes[0]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [hasValidationError, setHasValidationError] = useState(false);

  const companyOptions = useMemo(
    () =>
      companieslist.map((company) => ({
        value: company.id,
        name: company.name,
        label: company.label,
        inn: company.inn,
        kpp: company.kpp,
        ogrnip: company.ogrnip,
      })),
    [companieslist]
  );

  const incomeTypeOptions = useMemo(() => Object.values(incomeTransactionTypes), []);
  useEffect(() => {
    const company = companyOptions.find((c) => c.value === selectedCompanyId) ?? null;
    setSelectedCompany(company);
  }, [selectedCompanyId, companyOptions]);

  useEffect(() => {
    if (data) {
      setTransaction(data);
      setIncomeType(incomeTransactionTypes[data.type]);
      setSelectedCompanyId(data.company?.id);
      setSelectedDate(dayjs(data.date, 'DD.MM.YYYY'));
    }
  }, [data]);

  const handleDeleteTransaction = (id, e) => {
    e.stopPropagation();
    deleteTransaction({ id })
      .unwrap()
      .then(() => dispatch(removeTransactionById(id)))
      .catch(console.error)
      .finally(() => hideModal());
  };

  const handleUpdateTransaction = () => {
    const isInvalid = !selectedCompanyId || !incomeType || !selectedDate;
    if (isInvalid) {
      setHasValidationError(true);
      return;
    }
    setHasValidationError(false);
    const typeKey = Object.keys(incomeTransactionTypes).find(
      (key) => incomeTransactionTypes[key] === incomeType
    );
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
              options={incomeTypeOptions}
              value={incomeType}
              style={{ width: '200px' }}
              onChange={setIncomeType}
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
