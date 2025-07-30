// Redux
import { useDispatch } from 'react-redux';
import { setSelectedRecognizedType } from '../../redux/filters/slice';

//Components
import UniButton from 'components/General/UniButton/UniButton';
import Information from 'components/Information/Information';
import SectionButtons from 'components/SectionButtons/SectionButtons';

// Icons
import { ReactComponent as IconPlus } from 'assets/icons/iconPlus.svg';
import { ReactComponent as IconUploadWhite } from 'assets/icons/iconUploadWhite.svg';

// Styles
import s from './Main.module.scss';

const TABS = [
  { id: 'transactions', title: 'Транзакции' },
 /*  { id: 'extractions', title: 'Выписки' }, */
  // { id: 'accounts', title: 'Банковские счета' },
];

const MainHeader = ({
  activeTab,
  setActiveTab,
  showAddAccountBtn,
  handleAddAccount,
  handleUpload,
  isLoading,
  isUnknownTransaction,
  setIsUnknownTransaction,
}) => {
  const dispatch = useDispatch();
  const handleShowUnknown = () => {
    dispatch(setSelectedRecognizedType('1'));
    setIsUnknownTransaction(false);
    setActiveTab('transactions');
  };

  return (
    <header className={s.header}>
      <div className={s.block}>
        <SectionButtons load={isLoading} list={TABS} active={activeTab} setActive={setActiveTab} />
        <div className={s.buttons}>
          {showAddAccountBtn ? (
            <UniButton onClick={handleAddAccount} text="Добавить счет" icon={IconPlus} />
          ) : (
            <UniButton onClick={handleUpload} text="Загрузить выписку" icon={IconUploadWhite} />
          )}
        </div>
      </div>
      <Information onClick={handleShowUnknown} open={isUnknownTransaction} />
    </header>
  );
};

export default MainHeader;
