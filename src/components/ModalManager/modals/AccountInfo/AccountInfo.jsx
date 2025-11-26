import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

//redux
import {
  useChangeStatusBankAccountMutation,
  useSetMainBankAccountMutation,
} from '../../../../redux/services/accountsApi';

import Tippy from '@tippyjs/react';
// Hooks
import { useModal } from 'hooks/useModal';

// Components
import Modal from 'components/General/Modal/Modal';
import Switch from './components/Switch/Switch';
import UniButton from 'components/General/UniButton/UniButton';

// Icons
import { ReactComponent as EyeRed } from 'assets/icons/eyeRed.svg';
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconCopyWhite } from 'assets/icons/iconCopyWhite.svg';
import { ReactComponent as IconInfo } from 'assets/icons/iconInfo.svg';
import { ReactComponent as IconViewing } from 'assets/icons/iconViewingWhite.svg';
import { ReactComponent as RowBlue } from 'assets/icons/rowBlue.svg';

// Styles
import s from './AccountInfo.module.scss';
import useToast from 'hooks/useToast';
import { set } from 'lodash';

const options = [
  { value: 'passport', label: 'Паспорт' },
  { value: 'med_book', label: 'Мед. книжка' },
  { value: 'patent', label: 'Патент' },
];

const docTypes = ['Оказание услуг', 'Транспортный'];
const incomeTransactionTypes = ['Поступление', 'Возврат'];
// const outcomeTransactionTypes = ['Платеж', 'Возврат'];

const AccountInfo = () => {
  const { showToast } = useToast();
  const { modalProps, hideModal, showModal } = useModal();
  const [isDefault, setIsDefault] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { data } = modalProps || {};
  const [setMainBankAccount] = useSetMainBankAccountMutation();
  const [changeStatusBankAccount, { isLoading }] = useChangeStatusBankAccountMutation();

  useEffect(() => {
    setIsDefault(data?.is_main === 1);
    setIsActive(data?.status === 1);
  }, [data]);

  const handleChangeStatus = async () => {
    try {
      const res = await changeStatusBankAccount({ id: data.id }).unwrap();
      if (res.success) {
        showToast('Статус счета изменен', 'success');
        setIsActive(!isActive);
      }
    } catch (error) {
      showToast('Произошла ошибка', 'error');
    }
  };
  const handleSetDefault = async () => {
    try {
      const res = await setMainBankAccount(data.id).unwrap();
      if (res.success) {
        showToast('Счет выбран как основной', 'success');
        setIsDefault(true);
      }
    } catch (error) {
      showToast('Произошла ошибка', 'error');
    }
  };

  const getValue = (value) => (value?.toString().trim() ? value : '');

  const handleCopyDetails = async () => {
    try {
      const requisites = `
          Компания: ${getValue(data?.partnership?.name)}
          ИНН: ${getValue(data?.partnership?.inn)}
          КПП: ${getValue(data?.partnership?.kpp)}
          ОГРН: ${getValue(data?.partnership?.ogrn)}

          Банк: ${getValue(data?.bank)}
          БИК: ${getValue(data?.bik)}
          Корр. счёт: ${getValue(data?.kr)}
          Расчетный счёт: ${getValue(data?.rs)}

          Юридический адрес: ${getValue(data?.partnership?.ur_adress)}
          Фактический адрес: ${getValue(data?.partnership?.address)}
        `.trim();

      await navigator.clipboard.writeText(requisites);
      showToast('Реквизиты скопированы в буфер обмена', 'success');
    } catch (e) {
      showToast('Не удалось скопировать', 'error');
    }
  };

  return (
    <Modal isOpen={true} onClose={hideModal}>
      <div className={s.modal}>
        <div className={s.modalHeader}>
          <div className={s.title}>
            <h3>Банковский счет</h3>
          </div>
          <button className={s.close} onClick={hideModal}>
            <IconCloseBlack />
          </button>
        </div>

        {/* <Link
          to="/counterparties"
          className={classNames(s.link, { [s.link_vis]: isActive })}
          onClick={hideModal}
        >
          Связанные контрагенты
          <span className={s.count}>{count}</span>
          <span className={s.arrow}>
            <RowBlue />
          </span>
        </Link> */}

        <div className={s.body}>
          <PaymentDetails data={data} />
        </div>

        {/* <div className={classNames(s.switchWrapper, { [s.switchWrapper_vis]: isActive })}> */}
        {isActive && (
          <div className={classNames(s.switchWrapper)}>
            <Switch
              text="Основной счет"
              switchState={isDefault}
              setSwitchState={handleSetDefault}
              disabled={isDefault}
            />
            <Tippy content="Отметка автоматичсеки снимается при назначении нового основного счета">
              <IconInfo />
            </Tippy>
          </div>
        )}
        <div className={s.controlSection}>
          {!isActive && (
            <UniButton
              onClick={handleChangeStatus}
              text="Сделать активным"
              type="primary"
              iconPosition="right"
              icon={IconViewing}
              width={452}
            />
          )}

          {!isDefault && isActive && (
            <UniButton
              onClick={handleChangeStatus}
              text="Сделать неактивным"
              type="danger"
              iconPosition="right"
              icon={EyeRed}
              width={212}
            />
          )}

          {(isDefault || isActive) && (
            <UniButton
              onClick={handleCopyDetails}
              text="Копировать реквизиты"
              type="primary"
              iconPosition="right"
              icon={IconCopyWhite}
              width={isDefault ? 452 : 228}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AccountInfo;

const PaymentDetails = ({ data }) => {
  const { amount, transactionType, paymentType, description } = data;

  const fields = [
    { label: 'Компания', key: 'name' },
    { label: 'ИНН', key: 'inn' },
    { label: 'КПП', key: 'kpp' },
    { label: 'ОГРН', key: 'ogrn' },
    { label: 'Юр. адрес', key: 'ur_adress' },
    { label: 'Факт. адрес', key: 'address' },
    { label: 'Банк', key: 'bank' },
    { label: 'БИК', key: 'bik' },
    { label: 'Корр. счет', key: 'ks' },
    { label: 'Расчетный счет', key: 'rs' },
  ];

  const getValue = (obj, key) => {
    const value = obj?.partnership?.[key] ?? obj?.[key];
    return value?.toString().trim() ? value : '-';
  };

  const summaryData = [
    ['Сумма', amount],
    ['Тип транзакции', transactionType],
    ['Вид', paymentType],
    ['Назначение', description],
  ];

  return (
    <div className={s.paymentDetails}>
      <div className={s.grid}>
        {fields.map(({ label, key }, i) => (
          <div className={s.gridRow} key={i}>
            <div className={s.label}>{label}</div>
            <div className={classNames(s.content, s.payer)}>{getValue(data, key)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
