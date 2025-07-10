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

import ScrollToTopButton from 'components/General/ScrollToTopBtn/ScrollToTopBtn';
import CompanyFilter from 'components/Filters/CompanyFilter/CompanyFilter';
import CheckBox from 'components/General/CheckBox/CheckBox';
import ReceiverFilter from 'components/Filters/ReceiverFilter/ReceiverFilter';
import { companies, mockData, mockReceivers } from 'mock/mockData';
import TypeFilter from 'components/Filters/TypeFilter/TypeFilters';
import ClearFiltersBtn from 'components/Filters/COMPONENTS/ClearAllBtn/ClearFiltersBtn';
import { useSelector } from 'react-redux';
import { isAnyFilterActive } from '../../redux/filters/selectors';
import PayerFilter from 'components/Filters/PayerFilter/PayerFilter';
import DateFilter from 'components/Filters/DateFilter/DateFilter';

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
  const hasFilters = useSelector(isAnyFilterActive);
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
  console.log(mockReceivers);

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
          {hasFilters && <ClearFiltersBtn animation={hasFilters} />}
          <CompanyFilter data={companies} />
          <ReceiverFilter data={mockReceivers} />
          <TypeFilter />
          <PayerFilter data={mockReceivers} />
          <DateFilter />
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
