import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// Hooks
import { useModal } from 'hooks/useModal';
import { mockData } from 'mock/mockData';

import FiltersContainer from 'components/Filters/FiltersContainer';
// Components
import Search from 'components/General/Search/Search';
import UniButton from 'components/General/UniButton/UniButton';
import Information from 'components/Information/Information';
import SectionButtons from 'components/SectionButtons/SectionButtons';
import Table from 'components/Table/Table';

// Icons
import { ReactComponent as IconPlus } from 'assets/icons/iconPlus.svg';
import { ReactComponent as IconUploadWhite } from 'assets/icons/iconUploadWhite.svg';

// Styles
import s from './Main.module.scss';

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
  const containerRef = useRef();

  const { showModal } = useModal();

  const handleUppload = () => {
    showModal('UPLOAD_EXTRACTION');
  };

  const handleAddAccount = () => {
    showModal('ADD_ACCOUNT');
  };

  return (
    <div className={s.root} ref={containerRef}>
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
        <FiltersContainer type={activeSection} />
      </div>

      <div className={s.container}>
        {/* <InfiniteScroll
          dataLength={1}
          next={() => console.log('Загружена следующая страница')} // вставить loadNextPage из хука
          hasMore={true}
        ></InfiniteScroll> */}

        <Table isFetch={false} type={activeSection} list={mockData} />
      </div>
    </div>
  );
};

export default Main;
