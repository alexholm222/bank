import { useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

//redux
import { useGetTableDataInfiniteQuery } from '../../redux/services/tableDataApiActions';
import { useSelector, useDispatch } from 'react-redux';
import { setTabData } from '../../redux/tableData/tableDataSlice';

// Hooks
import { useModal } from 'hooks/useModal';

// Components
import Search from 'components/General/Search/Search';
import UniButton from 'components/General/UniButton/UniButton';
import Information from 'components/Information/Information';
import SectionButtons from 'components/SectionButtons/SectionButtons';
import Table from 'components/Table/Table';
import FiltersContainer from 'components/Filters/FiltersContainer';

// Icons
import { ReactComponent as IconPlus } from 'assets/icons/iconPlus.svg';
import { ReactComponent as IconUploadWhite } from 'assets/icons/iconUploadWhite.svg';

// Styles
import s from './Main.module.scss';

const TABS = [
  { id: 1, title: 'Транзакции' },
  { id: 2, title: 'Выписки' },
  { id: 3, title: 'Банковские счета' },
];

const Main = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(1);
  const queryArgs = useMemo(
    () => ({
      tab: activeTab,
      filters: {
        'filter[date_start]': '',
        'filter[date_end]': '',
        'filter[search]': searchQuery,
        'filter[partnership_ids]': '',
        'filter[company_ids]': '',
        'filter[kind]': '',
        'filter[type]': '',
        'filter[requires_action]': '',
      },
    }),
    [searchQuery, activeTab]
  );

  const dispatch = useDispatch();
  const { data, isFetching, isLoading, fetchNextPage, hasNextPage, error } =
    useGetTableDataInfiniteQuery(queryArgs, {
      refetchOnMountOrArgChange: true,
    });
  const transactions = useSelector((state) => state.tableData.transactions);
  const extractions = useSelector((state) => state.tableData.extractions);
  const accounts = useSelector((state) => state.tableData.accounts);

  console.log(extractions);
  console.log(accounts);
  const allRows = useMemo(() => {
    switch (activeTab) {
      case 1:
        return transactions;
      case 2:
        return extractions;
      case 3:
        return accounts;
      default:
        return [];
    }
  }, [activeTab, transactions, extractions, accounts]);

  const showAddAccountBtn = activeTab === 3;
  const containerRef = useRef();
  const { showModal } = useModal();

  useEffect(() => {
    if (data?.pages) {
      const allRows = data.pages.flatMap((page) => page.data);
      dispatch(setTabData({ tab: activeTab, data: allRows }));
    }
  }, [data, activeTab, dispatch]);

  const handleUpload = () => showModal('UPLOAD_EXTRACTION');
  const handleAddAccount = () => showModal('ADD_ACCOUNT');

  return (
    <div className={s.root} ref={containerRef}>
      <header className={s.header}>
        <Information onClick={() => {}} open={true} />
        <div className={s.block}>
          <SectionButtons
            load={isLoading}
            list={TABS}
            active={activeTab}
            setActive={setActiveTab}
          />
          <div className={s.buttons}>
            {showAddAccountBtn ? (
              <UniButton onClick={handleAddAccount} text="Добавить счет" icon={IconPlus} />
            ) : (
              <UniButton onClick={handleUpload} text="Загрузить выписку" icon={IconUploadWhite} />
            )}
          </div>
        </div>
      </header>

      <div className={s.queryPanel}>
        <Search isFetching={isFetching} searchValue={searchQuery} setSearchQuery={setSearchQuery} />

        <FiltersContainer type={activeTab} />
      </div>

      <div className={s.container}>
        <InfiniteScroll
          dataLength={allRows.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          scrollableTarget="scrollableDiv"
        >
          <Table type={activeTab} list={allRows} isFetch={isLoading} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Main;
