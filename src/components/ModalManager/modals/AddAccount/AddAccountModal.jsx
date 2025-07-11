import { useState } from 'react';
// Components
import Combobox from 'components/General/Combobox/Combobox';
import CustomInput from 'components/General/CustomInput/CustomInput';
import Modal from 'components/General/Modal/Modal';
import UniButton from 'components/General/UniButton/UniButton';
// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconDoneDouble } from 'assets/icons/iconDoneDouble.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
// Styles
import s from './AddAccountModal.module.scss';

const AddAccountModal = ({ onClose }) => {
  const [bik, setBik] = useState('');
  const [bankName, setBankName] = useState('');
  const [corrAccount, setCorrAccount] = useState('');
  const [account, setAccount] = useState('');

  const [errorBik, setErrorBik] = useState('');
  const [errorCorrAccount, setErrorCorrAccount] = useState('');
  const [errorAccount, setErrorAccount] = useState('');

  const bikData = [
    { bik: '123456789', bankName: 'Сбербанк АО', corrAccount: '30101810445250000411' },
    { bik: '987654321', bankName: 'ВТБ Банк ПАО', corrAccount: '30101810100000000787' },
  ];

  const handleBikFill = () => {
    const found = bikData.find((item) => item.bik === bik);
    if (found) {
      setBankName(found.bankName);
      setCorrAccount(found.corrAccount);
      setErrorBik('');
    } else {
      setBankName('');
      setCorrAccount('');
      setErrorBik('БИК не найден');
    }
  };

  const validateBik = () => {
    if (bik.length !== 9) {
      setErrorBik('БИК должен содержать 9 символов');
    } else {
      setErrorBik('');
    }
  };

  const validateCorrAccount = () => {
    if (corrAccount.length !== 20) {
      setErrorCorrAccount('Корр. счет должен содержать 20 символов');
    } else if (bik.length === 9 && corrAccount.startsWith('30101')) {
      const bikEnd = bik.slice(-3);
      const corrEnd = corrAccount.slice(-3);
      if (bikEnd !== corrEnd) {
        setErrorCorrAccount('Три последние цифры БИК и корр. счета должны совпадать');
      } else {
        setErrorCorrAccount('');
      }
    } else {
      setErrorCorrAccount('Корр. счет должен начинаться с 30101');
    }
  };

  const validateAccount = () => {
    if (account.length !== 20) {
      setErrorAccount('Расчетный счет должен содержать 20 символов');
    } else {
      setErrorAccount('');
    }
  };

  const isSuccess =
    !errorBik &&
    !errorCorrAccount &&
    !errorAccount &&
    bik.length === 9 &&
    corrAccount.length === 20 &&
    account.length === 20;

  const handleSubmit = () => {
    if (isSuccess) {
      alert('Счёт успешно добавлен');
    } else {
      validateBik();
      validateCorrAccount();
      validateAccount();
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={s.modal}>
        <div className={s.header}>
          <h3>Добавить счет</h3>
          <IconCloseBlack onClick={onClose} className={s.closeBtn} />
        </div>

        <Combobox options={bikData} />
        <CustomInput
          value={bik}
          onChange={(e) => setBik(e.target.value)}
          onBlur={validateBik}
          label="БИК"
          error={errorBik}
        />
        <div className={s.bikRow}>
          <CustomInput
            label="Название банка"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
          <button onClick={handleBikFill} className={s.bikButton}>
            Заполнить по БИК
          </button>
        </div>
        <CustomInput
          label="Корреспондентский счет"
          value={corrAccount}
          onChange={(e) => setCorrAccount(e.target.value)}
          onBlur={validateCorrAccount}
          error={errorCorrAccount}
        />
        <CustomInput
          label="Расчетный счет"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          onBlur={validateAccount}
          error={errorAccount}
        />
        <div className={s.buttons}>
          <UniButton
            onClick={onClose}
            text="Отменить"
            width={116}
            icon={IconCloseBlue}
            iconPosition="right"
            type="outline"
          />
          <UniButton
            onClick={handleSubmit}
            text={isSuccess ? 'Готово' : 'Добавить'}
            width={174}
            icon={isSuccess ? IconDoneDouble : IconDoneWhite}
            iconPosition="right"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddAccountModal;
