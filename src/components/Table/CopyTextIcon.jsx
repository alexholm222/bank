import { toast } from 'react-toastify';

import CustomToast from 'components/General/CustomToast/CustomToast';

// Icons
import { ReactComponent as IconCopy } from 'assets/icons/iconCopy.svg';

// Styles
import s from './Table.module.scss';
import useToast from 'hooks/useToast';
const CopyTextIcon = ({ textToCopy }) => {
  const { showToast } = useToast();
  const handleCopy = async (e) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(textToCopy);
    showToast('Скопировано в буфер', 'success');
  };
  return (
    <div className={s.wrapper}>
      <button
        className={s.iconButton}
        onClick={handleCopy}
        aria-label="Скопировать"
        style={{ cursor: 'pointer' }}
      >
        <IconCopy className={s.icon} />
      </button>
    </div>
  );
};
export default CopyTextIcon;
