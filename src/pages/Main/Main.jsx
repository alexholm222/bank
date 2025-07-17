import { useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

//utils
import formatDate from 'utils/formatDate';
import arrayToString from 'utils/arrayToString';

//redux
import { useGetTransactionsInfiniteQuery } from '../../redux/services/transactionsApi';
import { useSelector, useDispatch } from 'react-redux';
import { setTabData } from '../../redux/tableData/tableDataSlice';

// Hooks
import { useModal } from 'hooks/useModal';

// Components
import Search from 'components/General/Search/Search';
import Table from 'components/Table/Table';
import FiltersContainer from 'components/Filters/FiltersContainer';
import MainHeader from './MainHeader';

// Styles
import s from './Main.module.scss';

const Main = () => {
  const { dateStartPicker, dateEndPicker } = useSelector((state) => state.dateRange);
  const {
    transactionTypeFilter,
    transactionViewFilter,
    selectedStatus,
    selectedCompanies,
    selectedReceivers,
    selectedPayers,
    selectedActivity,
  } = useSelector((state) => state.filters);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(1);

  const transactionsParams = useMemo(() => {
    return {
      'filter[search]': searchQuery,
      'filter[date_start]': formatDate(dateStartPicker),
      'filter[date_end]': formatDate(dateEndPicker),
      'filter[partnership_ids]': '',
      'filter[company_ids]': '',
      'filter[kind]': arrayToString(transactionViewFilter) || '',
      'filter[type]': arrayToString(transactionTypeFilter) || '',
      'filter[requires_action]': '',
    };
  }, [searchQuery, dateStartPicker, dateEndPicker, transactionTypeFilter, transactionViewFilter]);

  const dispatch = useDispatch();
  const {
    data: transactionsList,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useGetTransactionsInfiniteQuery(transactionsParams);
  const transactions = useSelector((state) => state.tableData.transactions);

  const allRows = useMemo(() => {
    switch (activeTab) {
      case 1:
        return transactions;
      // case 2:
      //   return extractions;
      // case 3:
      //   return accounts;
      default:
        return [];
    }
  }, [activeTab, transactions]);

  useEffect(() => {
    if (transactionsList?.pages?.length) {
      const allItems = transactionsList.pages.flatMap((page) => page.data);
      dispatch(setTabData({ tab: 1, data: allItems }));
    }
  }, [transactionsList, dispatch]);

  const showAddAccountBtn = activeTab === 3;
  const containerRef = useRef();
  const { showModal } = useModal();

  const handleUpload = () => showModal('UPLOAD_EXTRACTION');
  const handleAddAccount = () => showModal('ADD_ACCOUNT');

  return (
    <div className={s.root} ref={containerRef}>
      <MainHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showAddAccountBtn={showAddAccountBtn}
        handleAddAccount={handleAddAccount}
        handleUpload={handleUpload}
        isLoading={isLoading}
      />

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
