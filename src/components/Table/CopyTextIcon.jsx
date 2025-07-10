import { toast } from 'react-toastify';

// Icons
import { ReactComponent as IconCopy } from 'assets/icons/iconCopy.svg';

// Styles
import s from './Table.module.scss';
import CustomToast from 'components/General/CustomToast/CustomToast';
const CopyTextIcon = ({ textToCopy }) => {
  const handleCopy = async (e) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(textToCopy);
    toast(
      ({ closeToast }) => <CustomToast message="Скоировано в буфер" closeToast={closeToast} />,
      {
        className: s.root,
        bodyClassName: s.body,
        style: { background: 'transparent', boxShadow: 'none', padding: 0 },
        autoClose: 1000,
        closeButton: false,
      }
    );
  };
  return (
    <div className={s.wrapper}>
      <button className={s.iconButton} onClick={handleCopy} aria-label="Скопировать">
        <IconCopy className={s.icon} />
      </button>
    </div>
  );
};
export default CopyTextIcon;
