import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import classNames from 'classnames';

import Button from 'components/General/Button/Button';
import Search from 'components/General/Search/Search';
import UniButton from 'components/General/UniButton/UniButton';
import Information from 'components/Information/Information';
import SectionButtons from 'components/SectionButtons/SectionButtons';
import Table from 'components/Table/Table';

import Transaction from 'components/ModalManager/modals/Transactions/Transaction';

import { ReactComponent as IconUploadWhite } from 'assets/icons/iconUploadWhite.svg';
import { ReactComponent as IconPlus } from 'assets/icons/iconPlus.svg';

import s from './Main.module.scss';
import { useModal } from 'hooks/useModal';

const mockData = {
  payer: {
    name: 'Рога и копыта ООО',
    inn: '123456789',
    kpp: '',
    bank: 'Модуль банк АО',
    bik: '123456789',
    correspondentAccount: '40702810680060657001',
    accountNumber: '40702810680060657001',
  },
  receiver: {
    name: 'Скилла Инновации ООО',
    inn: '123456789',
    kpp: '123456789',
    bank: 'Модуль банк АО',
    bik: '123456789',
    correspondentAccount: '40702810680060657001',
    accountNumber: '40702810680060657001',
  },
  amount: '12 345.60',
  transactionType: 'Входящая',
  paymentType: '-',
  description:
    'Поступил платеж от компании ООО “Агро 34” по счету лдотлоолиолимммммммммммммммммммммммммммммммммммммммммммммм',
};
const sectionButtons = [
  { id: 1, title: 'Транзакции' },
  { id: 2, title: 'Выписки' },
  { id: 3, title: 'Банковские счета' },
];

const Main = () => {
  // const {
  //   transactions,
  //   extractions,
  //   accounts,
  //   searchResult,
  //   fetchTransactions,
  //   fetchExtractions,
  //   fetchAccounts,
  //   fetchSearch,
  //   noFound,
  //   loadNextPage,
  // } = useInfiniteWorkers({
  //   paramsTransactions,
  //   paramsExtractions,
  //   paramsAccounts,
  //   paramsSearch,
  //   tableType,
  //   searchValue,
  // });

  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState(1);
  const [modalData, setModalData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const showAddAccountBtn = activeSection === 3;

  const { showModal } = useModal();
  const filteredData = [mockData].filter((item) =>
    item.payer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleUppload = () => {
    console.log('Click');
    showModal('UPLOAD_EXTRACTION');
  };

  const handleAddAccount = () => {
    console.log('Click');
    showModal('ADD_ACCOUNT');
  };

  return (
    <div className={s.root}>
      <header className={s.header}>
        <Information onClick={() => {}} open={true} />
        <div className={s.block}>
          <SectionButtons
            load={isLoading}
            list={sectionButtons}
            active={activeSection}
            setActive={setActiveSection}
          />
          <div className={s.buttons}>
            {showAddAccountBtn ? (
              <UniButton onClick={handleAddAccount} text={'Добавить счет'} icon={IconPlus} />
            ) : (
              <UniButton
                onClick={handleUppload}
                text={'Загрузить выписку'}
                icon={IconUploadWhite}
              />
            )}
          </div>
        </div>
      </header>
      <Search isFetching={false} searchValue={searchQuery} setSearchQuery={setSearchQuery} />
      <div className={s.container}>
        <div className={s.container}>
          <InfiniteScroll
            dataLength={1}
            next={() => console.log('Загружена следующая страница')} // вставить loadNextPage из хука
            hasMore={true}
          >
            <Table isFetch={isLoading} type={activeSection} list={[mockData]} />
          </InfiniteScroll>
        </div>
      </div>
      <section className={s.transactionSection}></section>
    </div>
  );
};

export default Main;
