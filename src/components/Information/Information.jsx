import classNames from 'classnames';

import s from './Information.module.scss';

//icons
import { ReactComponent as IconViewing } from '../../assets/icons/iconViewing.svg';
import { ReactComponent as WarningOctagon } from '../../assets/icons/WarningOctagon.svg';

const Information = ({ open, onClick }) => {
  const handleConfirm = () => {
    onClick();
  };

  return (
    <div onClick={handleConfirm} className={classNames(s.root, open && s.root_open)}>
      <div className={s.content}>
        <div className={s.block}>
          <WarningOctagon />
          <p>Есть нераспознанные транзакции</p>
        </div>
        <button className={s.button}>
          <IconViewing />
          <p>Смотреть</p>
        </button>
      </div>
    </div>
  );
};

export default Information;
