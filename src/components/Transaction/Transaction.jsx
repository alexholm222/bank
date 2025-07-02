import React, { useState, useCallback } from "react";

//components
import Modal from "components/General/Modal/Modal";
import Dropdown from "components/General/Dropdown/Dropdown";
import DataPickerCalendar from "components/General/DataPickerCalendar/DataPickerCalendar";
import DateInput from "components/General/DateInput/DateInput";
import Combobox from "components/General/Combobox/Combobox";
import Button from "components/General/Button/Button";
import ButtonSecond from "components/General/ButtonSecond/ButtonSecond";

//libs
import dayjs from "dayjs";

//icons
import { ReactComponent as IconDoneWhite } from "assets/icons/iconDoneWhite.svg";
import { ReactComponent as IconCloseBlack } from "assets/icons/iconCloseBlack.svg";
import { ReactComponent as IconDeleteRed } from "assets/icons/iconDeleteRed.svg";

//styles
import classNames from "classnames";
import s from "./Transaction.module.scss";

// const { data: parameters } = useGetParametrsQuery();
// const [uploadDocument] = useUploadDocumentMutation();
// const categories = parameters?.categories || [];

const categories = [
  "Паспорт",
  "Мед книжка",
  "ID",
  "Патент",
  "Права",
  "Лицензии и сертификаты",
  "Прочее",
];

const Transaction = ({ data }) => {
  const incomeTransactionTypes = ["Поступление", "Возврат"];
  const outcomeTransactionTypes = ["Платеж", "Возврат"];
  const docTypes = ["Оказание услуг", "Транспортный"];

  const [incomeType, setIncomeType] = useState(incomeTransactionTypes[0]);
  const [outcomeType, setOutcomeType] = useState(outcomeTransactionTypes[0]);
  const [docType, setDoctype] = useState(docTypes[0]);
  const [closeModal, setCloseModal] = useState(true);

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [openCalendar, setOpenCalendar] = useState(false);

  const number = 123344;
  const date = "12.12.2022";

  const onClose = () => {
    setCloseModal(false);
  };
  return (
    <Modal isOpen={closeModal} onClose={onClose}>
      <div className={s.modal}>
        <div className={s.modal_header}>
          <div className={s.title}>
            <h3>{`Транзакция ${number} от ${date}`}</h3>
          </div>
          <button className={s.close} onClick={onClose}>
            <IconCloseBlack />
          </button>
        </div>
        <div className={s.body}>
          <PaymentDetails data={data} />
        </div>
        <div className={s.controlSection}>
          <div className={s.control}>
            <DateInput
              selectedDate={selectedDate}
              setOpenCalendar={setOpenCalendar}
            />
            {openCalendar && (
              <DataPickerCalendar
                value={selectedDate}
                setValue={setSelectedDate}
                setOpenCalendar={setOpenCalendar}
                nosub={false}
              />
            )}
            <Dropdown
              options={incomeTransactionTypes}
              value={incomeType}
              className={s.dropdown}
              onChange={setIncomeType}
            />
          </div>
          <Combobox className={s.combobox} />
          <div className={s.control}>
            <Dropdown
              options={docTypes}
              value={docType}
              className={s.dropdown}
              onChange={setDoctype}
            />
            <Combobox className={s.combobox} />
          </div>
          <div className={s.control_btn}>
            {" "}
            <ButtonSecond
              type={"red"}
              Icon={IconDeleteRed}
              buttonText={"Удалить"}
              handler={() => {
                console.log("delete");
              }}
            />
            <Button
              width={314}
              type={"right"}
              Icon={IconDoneWhite}
              buttonText={"Сохранить"}
              handler={() => {
                console.log("save");
              }}
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
  const { payer, receiver, amount, transactionType, paymentType, description } =
    data;

  const renderFields = (entity, withLabels = false) => (
    <>
      {[
        ["Наименование", entity?.name],
        ["ИНН", entity?.inn],
        ["КПП", entity?.kpp],
        ["Банк", entity?.bank],
        ["БИК", entity?.bik],
        ["Корр. счет", entity?.correspondentAccount],
        ["Расчетный счет", entity?.accountNumber],
      ].map(([label, value], index) => (
        <div key={index} className={s.row}>
          {withLabels && <div className={s.label}>{label}</div>}
          <div className={s.content}>{value}</div>
        </div>
      ))}
    </>
  );

  return (
    <div className={s.paymentDetails}>
      <div className={s.sectionHeader}>
        <div className={s.headerTitle}>Плательщик</div>
        <div className={s.headerTitle}>Получатель</div>
      </div>

      <div className={s.detailsGrid}>
        <div className={s.column}>{renderFields(null, true)}</div>
        <div className={classNames(s.column, s.payer)}>
          {renderFields(payer)}
        </div>
        <div className={s.column}>{renderFields(receiver)}</div>
      </div>

      <div className={s.paymentSummary}>
        <div className={s.sectionSubtitle}>Детали платежа из выписки</div>

        <div className={s.row}>
          <div className={s.label}>Сумма</div>
          <div className={s.content}>{amount}</div>
        </div>
        <div className={s.row}>
          <div className={s.label}>Тип транзакции</div>
          <div className={s.content}>{transactionType}</div>
        </div>
        <div className={s.row}>
          <div className={s.label}>Вид</div>
          <div className={s.content}>{paymentType}</div>
        </div>
        <div className={s.row}>
          <div className={s.label}>Назначение</div>
          <div className={s.content}>{description}</div>
        </div>
      </div>
    </div>
  );
};
