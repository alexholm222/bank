import { useState, useCallback } from "react";

//components
import Modal from "components/General/Modal/Modal";
import Dropdown from "components/General/Dropdown/Dropdown";

//libs
import dayjs from "dayjs";

//icons
import { ReactComponent as IconChevron } from "assets/icons/iconChewron.svg";
import { ReactComponent as IconDoneWhite } from "assets/icons/iconDoneWhite.svg";
import { ReactComponent as IconPlusBlack } from "assets/icons/iconPlusBlack.svg";
import { ReactComponent as IconCloseBlack } from "assets/icons/iconCloseBlack.svg";
import { ReactComponent as IconDoneGrey } from "assets/icons/iconDoneGrey.svg";
import { ReactComponent as FolderIcon } from "assets/icons/folderIcon.svg";
import { ReactComponent as IconDelete } from "assets/icons/iconDelete.svg";

//styles
import classNames from "classnames";
import s from "./Transaction.module.scss";
import DataPickerCalendar from "components/General/DataPickerCalendar/DataPickerCalendar";
import DateInput from "components/General/DateInput/DateInput";

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
    <Modal isOpen={closeModal}>
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
        <div className={s.control_section}>
          <div className={s.control}>
            {" "}
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
              className={s.types_dropdown}
              onChange={setIncomeType}
            />
          </div>
          <div>
            <Dropdown
              options={outcomeTransactionTypes}
              value={outcomeType}
              className={s.types_dropdown}
              onChange={setOutcomeType}
            />
            <Dropdown
              options={docTypes}
              value={docType}
              className={s.types_dropdown}
              onChange={setDoctype}
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

  const renderFields = (entity) => (
    <>
      <div>
        {!entity && <div className={s.label}>Наименование</div>}
        {entity && <div className={s.content}>{entity.name}</div>}
      </div>
      <div>
        {!entity && <div className={s.label}>ИНН</div>}
        {entity && <div className={s.content}>{entity.inn}</div>}
      </div>
      <div>
        {!entity && <div className={s.label}>КПП</div>}
        {entity && <div className={s.content}>{entity.kpp}</div>}
      </div>
      <div>
        {!entity && <div className={s.label}>Банк</div>}
        {entity && <div className={s.content}>{entity.bank}</div>}
      </div>
      <div>
        {!entity && <div className={s.label}>БИК</div>}
        {entity && <div className={s.content}>{entity.bik}</div>}
      </div>
      <div>
        {!entity && <div className={s.label}>Корр. счет</div>}
        {entity && (
          <div className={s.content}>{entity.correspondentAccount}</div>
        )}
      </div>
      <div>
        {!entity && <div className={s.label}>Счет</div>}
        {entity && <div className={s.content}>{entity.accountNumber}</div>}
      </div>
    </>
  );

  return (
    <div className={s.payment_details}>
      <div className={s.section_header}>
        <div className={s.empty}></div>
        <div className={s.header_title}>Плательщик</div>
        <div className={s.header_title}>Получатель</div>
      </div>

      <div className={s.details_grid}>
        <div className={s.column}>{renderFields()}</div>
        <div className={classNames(s.column, s.payer)}>
          {renderFields(payer)}
        </div>
        <div className={s.column}>{renderFields(receiver)}</div>
      </div>

      <div className={s.details_grid}>
        <div className={s.column}>
          {" "}
          <div className={s.label_empty}></div>
          <div className={s.label}>Сумма</div>
          <div className={s.label}>Тип транзакции</div>
          <div className={s.label}>Вид</div>
          <div className={s.label}>Назначение</div>
        </div>
        <div className={s.column}>
          <div className={s.section_subtitle}>Детали платежа из выписки</div>
          <div className={classNames(s.content_wide, s.content)}>{amount}</div>
          <div className={classNames(s.content_wide, s.content)}>
            {paymentType}
          </div>
          <div className={classNames(s.content_wide, s.content)}>
            {transactionType}
          </div>
          <div className={classNames(s.content_wide, s.content)}>
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
