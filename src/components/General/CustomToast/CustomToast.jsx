import { toast,ToastContainer } from 'react-toastify';

import s from './CustomToast.module.scss';

import 'react-toastify/dist/ReactToastify.css';

const CustomToast = ({ closeToast, message }) => {
  return (
    <div className={`${s.notification} ${s.notification_anim}`}>
      <div className={s.line} />
      <div className={s.icon}>{}</div>
      <p>{message}</p>
      <div className={s.close} onClick={closeToast}>
        ✖
      </div>
    </div>
  );
};

export default CustomToast;
