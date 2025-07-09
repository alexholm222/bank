import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import classNames from 'classnames';
// Hooks
import { useModal } from 'hooks/useModal';

// Components
import Search from 'components/General/Search/Search';
import UniButton from 'components/General/UniButton/UniButton';
import Information from 'components/Information/Information';
import SectionButtons from 'components/SectionButtons/SectionButtons';
import Table from 'components/Table/Table';
// Icons
import { ReactComponent as IconPlus } from 'assets/icons/iconPlus.svg';
import { ReactComponent as IconUploadWhite } from 'assets/icons/iconUploadWhite.svg';
import { ReactComponent as IconHome } from 'assets/icons/iconHome.svg';
// Styles
import s from './Main.module.scss';
import Filters from 'components/Filters/Filters';
import ReusableFilterGroup from 'components/General/ReusableFilterGroup/ReusableFilterGroup';
import ScrollToTopButton from 'components/General/ScrollToTopBtn/ScrollToTopBtn';

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

const companiesList = [
  {
    city: 'Москва',
    companies: [
      { id: 1, name: 'Скилла Инновации ООО', inn: '4703170282', kpp: '780601001' },
      { id: 2, name: 'Шабашкин ИП', inn: '4363464777', ogrnip: '102773964228146' },
    ],
  },
  {
    city: 'Санкт-Петербург',
    companies: [
      { id: 3, name: 'Грузчиков сервис северо-запад ООО', inn: '4363464777', kpp: '780601001' },
    ],
  },
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
      <div className={s.queryPanel}>
        <Search isFetching={false} searchValue={searchQuery} setSearchQuery={setSearchQuery} />
        <div className={s.filters}>
          <Filters />
          <ReusableFilterGroup
            icon={IconHome}
            btnTitle="Компания"
            modalTitle="Мои компании"
            options={companiesList}
            onConfirm={(selected) => console.log('Выбрано:', selected)}
            onReset={() => console.log('Сброшено')}
          />
        </div>
      </div>

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
      <ScrollToTopButton />
    </div>
  );
};

export default Main;
