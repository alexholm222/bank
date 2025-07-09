//components
import Modal from 'components/General/Modal/Modal';
import UniButton from 'components/General/UniButton/UniButton';
//icons
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconLogout } from 'assets/icons/iconLogout.svg';
//styles
import s from './ChangeDetail.module.scss';
import Dropdown from 'components/General/Dropdown/Dropdown';

const ChangeDetail = ({ onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={s.modal}>
        <div className={s.header}>
          <div className={s.titleWrapper}>
            <IconLogout />
            <h3>Замена реквизитов</h3>
          </div>
          <IconCloseBlack onClick={onClose} className={s.closeBtn} />
        </div>
        <Dropdown
          placeholder="Выберите банк"
          options={['Банк 1', 'Банк 2', 'Банк 3']}
          label="Заменить реквизиты у закзчиков"
        />
        <UniButton text="Готово" icon={IconDoneWhite} />
      </div>
    </Modal>
  );
};

export default ChangeDetail;
