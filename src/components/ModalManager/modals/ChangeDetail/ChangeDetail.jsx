import { useEffect, useState } from 'react';
import Modal from 'components/General/Modal/Modal';
import { ReactComponent as IconCloseBlack } from 'assets/icons/iconCloseBlack.svg';
import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';

import { ReactComponent as IconLogout } from 'assets/icons/iconLogout.svg';
import s from './ChangeDetail.module.scss';
import UniButton from 'components/General/UniButton/UniButton';
import CustomInput from 'components/General/CustomInput/CustomInput';
import Combobox from 'components/General/Combobox/Combobox';

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
        <UniButton text="Готово" icon={IconDoneWhite} />
      </div>
    </Modal>
  );
};

export default ChangeDetail;
