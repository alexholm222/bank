import { useEffect, useState } from 'react';
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

  const [success, setSuccess] = useState(false);

  const bikData = [
    { bik: '123456789', bankName: 'Сбербанк АО', corrAccount: '30101810445250000411' },
    { bik: '987654321', bankName: 'ВТБ Банк ПАО', corrAccount: '30101810100000000787' },
  ];

  const handleBikFill = () => {
    const found = bikData.find((item) => item.bik === bik);
    if (found) {
      setBankName(found.bankName);
      setCorrAccount(found.corrAccount);
    } else {
      setBankName('');
      setCorrAccount('');
      setErrorBik('БИК не найден');
    }
  };

  useEffect(() => {
    let bikError = '';
    let corrError = '';
    let accError = '';

    if (bik && bik.length !== 9) {
      bikError = 'БИК должен содержать 9 символов';
    }

    if (corrAccount && corrAccount.length !== 20) {
      corrError = 'Корр. счет должен содержать 20 символов';
    } else if (corrAccount && bik && corrAccount.length === 20 && bik.length === 9) {
      if (!corrAccount.startsWith('30101')) {
        corrError = 'Корр. счет должен начинаться с 30101';
      } else {
        const bikEnd = bik.slice(-3);
        const corrEnd = corrAccount.slice(-3);
        if (bikEnd !== corrEnd) {
          corrError = 'Три последние цифры БИК и корр. счета должны совпадать';
        }
      }
    }

    if (account && account.length !== 20) {
      accError = 'Расчетный счет должен содержать 20 символов';
    }

    setErrorBik(bikError);
    setErrorCorrAccount(corrError);
    setErrorAccount(accError);

    setSuccess(!bikError && !corrError && !accError && bik && corrAccount && account);
  }, [bik, corrAccount, account]);

  const handleSubmit = () => {
    if (success) {
      alert('Счёт успешно добавлен');
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
          error={errorCorrAccount}
        />
        <CustomInput
          label="Расчетный счет"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
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
            text={success ? 'Готово' : 'Добавить'}
            width={174}
            icon={success ? IconDoneDouble : IconDoneWhite}
            iconPosition="right"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddAccountModal;
