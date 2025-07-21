import { useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

//utils
import getTransactionsParams from '../../utils/queryParams/getTransactionsParams';

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
import { mockData } from 'mock/mockData';

const Main = () => {
  const dispatch = useDispatch();
  const { showModal } = useModal();
  const containerRef = useRef();

  const { dateStartPicker, dateEndPicker } = useSelector((state) => state.dateRange);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUnknownTransaction, setIsUnknownTransaction] = useState(false);
  const transactions = useSelector((state) => state.tableData.transactions);
  const [activeTab, setActiveTab] = useState('transactions');
  const {
    transactionTypeFilter,
    transactionViewFilter,
    selectedStatus,
    selectedCompanies,
    selectedReceivers,
    selectedPayers,
    selectedActivity,
    selectedRecognizedType,
  } = useSelector((state) => state.filters);

  const transactionsParams = getTransactionsParams(
    searchQuery,
    dateStartPicker,
    dateEndPicker,
    transactionTypeFilter,
    transactionViewFilter,
    isUnknownTransaction,
    selectedRecognizedType
  );

  const {
    data: transactionsList,
    isFetching: isFetchingTransactions,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useGetTransactionsInfiniteQuery(transactionsParams);

  //////////////////////////////////////////////////////////////////////////////////
  //Если data.length > 0, то показываем предупреждение о не распознанных транзакциях
  const { data: transactionsListUnknown } = useGetTransactionsInfiniteQuery({
    'filter[requires_action]': '1',
  });
  useEffect(() => {
    const hasUnknownTransactions = transactionsListUnknown?.pages?.[0]?.data?.length > 0;
    setIsUnknownTransaction(hasUnknownTransactions);
    setIsUnknownTransaction(hasUnknownTransactions);
  }, [transactionsListUnknown]);
  //////////////////////////////////////////////////////////////////////////////////

  const showAddAccountBtn = activeTab === 'accounts';

  const allRows = useMemo(() => {
    switch (activeTab) {
      case 'transactions':
        return transactions;
      case 'extractions':
        return mockData;
      case 'accounts':
        return mockData;
      default:
        return [];
    }
  }, [activeTab, transactions]);

  const handleUpload = () => showModal('UPLOAD_EXTRACTION');
  const handleAddAccount = () => showModal('ADD_ACCOUNT');

  useEffect(() => {
    if (transactionsList?.pages?.length) {
      const allItems = transactionsList.pages.flatMap((page) => page.data);
      dispatch(setTabData({ tab: activeTab, data: allItems }));
    }
  }, [transactionsList, dispatch, activeTab]);

  return (
    <div className={s.root} ref={containerRef}>
      <MainHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showAddAccountBtn={showAddAccountBtn}
        handleAddAccount={handleAddAccount}
        handleUpload={handleUpload}
        isLoading={isLoading}
        isUnknownTransaction={isUnknownTransaction}
        setIsUnknownTransaction={setIsUnknownTransaction}
      />

      <div className={s.queryPanel}>
        <Search
          isFetching={isFetchingTransactions}
          searchValue={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <FiltersContainer type={activeTab} isFetching={isFetchingTransactions} />
      </div>

      <div className={s.container}>
        <InfiniteScroll
          dataLength={allRows.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          scrollableTarget="scrollableDiv"
        >
          <Table type={activeTab} list={allRows} isFetching={isLoading} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Main;
