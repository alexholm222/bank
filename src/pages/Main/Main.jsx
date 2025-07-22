import { useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

//mock
import { mockData } from 'mock/mockData';

//utils
import getTransactionsParams from '../../utils/queryParams/getTransactionsParams';

//redux
import { useGetTransactionsInfiniteQuery } from '../../redux/services/transactionsApi';
import { useSelector, useDispatch } from 'react-redux';
import { setTabData } from '../../redux/tableData/tableDataSlice';
import { useGetCompaniesQuery } from '../../redux/services/filtersApiActions';
import { setCompanies, setPartnerships } from '../../redux/filters/companiesListSlice';

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
    selectedCompanies,
    selectedPartnerships,
    selectedRecognizedType,
  } = useSelector((state) => state.filters);

  const transactionsParams = getTransactionsParams({
    selectedPartnerships,
    searchQuery,
    dateStartPicker,
    dateEndPicker,
    transactionTypeFilter,
    transactionViewFilter,
    selectedRecognizedType,
    selectedCompanies,
  });

  const {
    data: transactionsList,
    isFetching: isFetchingTransactions,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
  } = useGetTransactionsInfiniteQuery(transactionsParams);

  //////////////////////////////////////////////////////////////////////////////////
  //Если data.length > 0, то показываем предупреждение о не распознанных транзакциях
  const { data: transactionsListUnknown } = useGetTransactionsInfiniteQuery({
    'filter[requires_action]': '1',
  });
  useEffect(() => {
    const hasUnknownTransactions = transactionsListUnknown?.pages?.[0]?.data?.length > 0;
    setIsUnknownTransaction(hasUnknownTransactions);
  }, [transactionsListUnknown]);
  //////////////////////////////////////////////////////////////////////////////////
  //Получаем список компаний для фильтров
  const { data: companiesListForFilters } = useGetCompaniesQuery();
  useEffect(() => {
    if (companiesListForFilters) {
      dispatch(setCompanies(companiesListForFilters.companies));
      dispatch(setPartnerships(companiesListForFilters.partnership_details));
    }
  }, [companiesListForFilters, dispatch]);
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
          <Table type={activeTab} list={allRows} isFetching={isLoading} error={error} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Main;
