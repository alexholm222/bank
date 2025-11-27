import { useEffect, useState, useMemo } from 'react';
import 'dayjs/locale/ru';

//Redux
import {
  useCreateBankAccountMutation,

} from '../../../../redux/services/accountsApi';
import { useGetBankByBikMutation } from '../../../../redux/services/dadataApiActions';
import { useGetCompaniesQuery } from '../../../../redux/services/filtersApiActions';
// Hooks
import { useModal } from 'hooks/useModal';
import useToast from 'hooks/useToast';

// Components
import Modal from 'components/General/Modal/Modal';
import UniButton from 'components/General/UniButton/UniButton';
import Field from 'components/General/Field/Field';
import InputBankAccount from './InputBankAccount/InputBankAccount';
import InputBik from './InputBik/InputBik';
import InputText from 'components/General/InputText/InputText';

// Icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconPlusBlack } from 'assets/icons/iconPlusBlack.svg';
import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconDoneGrey } from 'assets/icons/iconDoneGrey.svg';

// Styles
import s from './BankAccount.module.scss';
import Combobox from 'components/General/Combobox/Combobox';

const BankAccount = () => {
  const { showToast } = useToast();
  const { modalProps, hideModal } = useModal();
  const safeModalProps = modalProps || {};
  const { companyId, bankAccount = {}, onSuccess } = safeModalProps;
  const isCreateMode = !bankAccount || Object.keys(bankAccount).length === 0;

  const [bik, setBik] = useState('');
  const [bank, setBank] = useState('');
  const [ks, setKs] = useState('');
  const [rs, setRs] = useState('');
  const [partnershipId, setPartnershipId] = useState(null);
  const [selectedPartnership, setSelectedPartnership] = useState(null);
  const [dadata, setDadata] = useState({});

  const [createBankAccount, { isLoading}] =  useCreateBankAccountMutation();
  const { data: parameters } = useGetCompaniesQuery();
  const [getBankByBik] = useGetBankByBikMutation();

  const partnershipOptions = useMemo(() => {
    const partnershipDetails = parameters?.partnership_details || [];
    if (!Array.isArray(partnershipDetails) || partnershipDetails.length === 0) return [];
    
    // Убираем дубликаты по partnership_id, оставляя первое вхождение
    const uniquePartnerships = new Map();
    partnershipDetails.forEach((item) => {
      const partnershipId = item.partnership_id;
      if (partnershipId && !uniquePartnerships.has(partnershipId)) {
        uniquePartnerships.set(partnershipId, item);
      }
    });
    
    // Преобразуем в формат, который ожидает Combobox
    return Array.from(uniquePartnerships.values()).map((item) => ({
      value: item.partnership_id,
      label: item.partnership_name,
      badge: item.label || null,
      inn: item.inn || '',
      kpp: item.kpp || '',
      ogrn: item.ogrn || '',
    }));
  }, [parameters]);

  const disabledBtn = useMemo(
    () => !partnershipId || bik.length !== 9 || !bank || ks.length !== 20 || rs.length !== 20,
    [partnershipId, bik, bank, ks, rs]
  );



  useEffect(() => {
    if (companyId && partnershipOptions.length > 0) {
      const partnership = partnershipOptions.find((p) => p.value === companyId);
      if (partnership) {
        setSelectedPartnership(partnership);
        setPartnershipId(partnership.value);
      }
    }
  }, [companyId, partnershipOptions]);

  useEffect(() => {
    if (bik.length !== 9) return;

    getBankByBik({ bik })
      .unwrap()
      .then(setDadata)
      .catch((error) => console.error('Ошибка получения банка по БИК:', error));
  }, [bik, getBankByBik]);

  const handleFillByBik = () => {
    setBank(dadata.value || '');
    setKs(dadata.data?.correspondent_account || '');
  };

  const getPayload = () => ({
    partnership_id: partnershipId,
    bank,
    bik,
    ks,
    rs,
  });

  const handleAddAccount = async () => {
    try {
      const payload = getPayload();
      await createBankAccount(payload).unwrap();
      showToast('Счет успешно создан', 'success');
      if (onSuccess) {
        onSuccess();
      }
      hideModal();
    } catch (error) {
      console.error('Ошибка создания счета:', error);
      showToast('Ошибка при создании счета', 'error');
    }
  };
 

  return (
    <Modal isOpen onClose={hideModal}>
      <div className={s.modal}>
        <div className={s.header}>
          <div className={s.title}>
            <IconPlusBlack />
            <p>Добавить счет</p>
          </div>
          <div onClick={hideModal} className={s.close}>
            <IconCloseBlack />
          </div>
        </div>

        <div className={s.content}>
          <Field text="Партнерство">
            <Combobox 
              options={partnershipOptions} 
              value={selectedPartnership} 
              onChange={(option) => {
                setSelectedPartnership(option);
                setPartnershipId(option?.value || null);
              }} 
              width={300} 
            />
          </Field>
          <Field text="БИК">
            <InputBik account={bik} setAccount={setBik} width={300} />
          </Field>
          {dadata &&
            typeof dadata === 'object' &&
            !Array.isArray(dadata) &&
            Object.keys(dadata).length > 0 && (
              <button onClick={handleFillByBik} className={s.fillBtn}>
                Заполнить по БИК
              </button>
            )}

          <Field text="Банк">
            <InputText width={300} text={bank} setText={setBank} />
          </Field>

          <Field text="Корреспондентский счет">
            <InputBankAccount account={ks} setAccount={setKs} width={300} />
          </Field>

          <Field text="Расчётный счет">
            <InputBankAccount account={rs} setAccount={setRs} width={300} />
          </Field>

          

         
        </div> 

       <div className={s.btns}>
          
          <UniButton
            text="Отменить"
            onClick={hideModal}
            type="outline"
            icon={IconCloseBlue}
            iconPosition="right"

          />
          <UniButton
          iconPosition="right"
            text={'Добавить'}
            onClick={handleAddAccount}
            isLoading={isLoading}
            icon={disabledBtn ? IconDoneGrey : IconDoneWhite }
            width={174}
            disabled={ disabledBtn }
          />
        
        </div> 
      </div>
    </Modal>
  );
};

export default BankAccount;
