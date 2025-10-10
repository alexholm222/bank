import { useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

//utils
import getTransactionsParams from '../../utils/queryParams/getTransactionsParams';

//redux
import { useGetTransactionsInfiniteQuery } from '../../redux/services/transactionsApi';
import { useSelector, useDispatch } from 'react-redux';
import { setTabData } from '../../redux/tableData/tableDataSlice';
import { useGetCompaniesQuery } from '../../redux/services/filtersApiActions';
import { setCompanies, setPartnerships } from '../../redux/filters/companiesListSlice';
import { useGetExtractionsInfiniteQuery } from '../../redux/services/extractionsApi';
import { makeSelectAllRows } from '../../redux/tableData/tableDataSelectors';
import { setIsUnknownTransaction } from '../../redux/filters/unknownTransactionsSlice';
// Hooks
import { useModal } from 'hooks/useModal';

// Components
import Search from 'components/General/Search/Search';
import Table from 'components/Table/Table';
import FiltersContainer from 'components/Filters/FiltersContainer';
import MainHeader from './MainHeader';

// Styles
import s from './Main.module.scss';
import getExtractionsParams from 'utils/queryParams/getExtractionsParams';

const Main = () => {
  const dispatch = useDispatch();
  const { showModal } = useModal();
  const containerRef = useRef();

  const { dateStartPicker, dateEndPicker } = useSelector((state) => state.dateRange);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('transactions');
  const selectAllRows = useMemo(() => makeSelectAllRows(activeTab), [activeTab]);

  const allRows = useSelector(selectAllRows);

  const {
    transactionTypeFilter,
    transactionViewFilter,
    selectedCompanies,
    selectedPartnerships,
    selectedRecognizedType,
    selectedStatus,
  } = useSelector((state) => state.filters);

  const transactionsParams = getTransactionsParams({
    selectedPartnerships,
    searchQuery,
    dateStartPicker,
    dateEndPicker,
    transactionTypeFilter,
    transactionViewFilter,
    selectedRecognizedType,
    selectedCompanies
  });

  const {
    data: transactionsList,
    isFetching: isFetchingTransactions,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
  } = useGetTransactionsInfiniteQuery(transactionsParams);

  const extractionsParams = getExtractionsParams({
    searchQuery,
    dateStartPicker,
    dateEndPicker,
    selectedPartnerships,
    selectedStatus,
  });

  const { data: extractionsList, isFetching: isFetchingExtractions, isLoading: isLoadingExtractions } =
    useGetExtractionsInfiniteQuery(extractionsParams);

  //////////////////////////////////////////////////////////////////////////////////
  //Если data.length > 0, то показываем предупреждение о не распознанных транзакциях
  const { data: transactionsListUnknown, isSuccess } = useGetTransactionsInfiniteQuery(
    { 'filter[requires_action]': '1' },
    {
      skip: selectedRecognizedType !== '',
    }
  );

  useEffect(() => {
    if (!isLoadingExtractions && isFetchingExtractions) {
      refetch()
      return
    }
  }, [isFetchingExtractions, isLoadingExtractions])

  useEffect(() => {
    if (isSuccess && selectedRecognizedType === '') {
      const hasUnknown = transactionsListUnknown?.pages?.[0]?.data?.length > 0;
      dispatch(setIsUnknownTransaction(hasUnknown));
    }
  }, [isSuccess, transactionsListUnknown, selectedRecognizedType, dispatch]);

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
  const handleUpload = () => showModal('UPLOAD_EXTRACTION');
  const handleAddAccount = () => showModal('ADD_ACCOUNT');

  const isFetching = useMemo(() => {
    if (activeTab === 'transactions') return isFetchingTransactions;
    if (activeTab === 'extractions') return isFetchingExtractions;
    return false;
  }, [activeTab, isFetchingTransactions, isFetchingExtractions]);

  useEffect(() => {
    if (transactionsList?.pages?.length && activeTab === 'transactions') {
      const allItems = transactionsList.pages.flatMap((page) => page.data);
      dispatch(setTabData({ tab: 'transactions', data: allItems }));
    }
  }, [transactionsList, dispatch, activeTab]);

  useEffect(() => {
    if (extractionsList?.pages?.length && activeTab === 'extractions') {
      const allItems = extractionsList.pages.flatMap((page) => page.data);
      dispatch(setTabData({ tab: 'extractions', data: allItems }));
    }
  }, [extractionsList, dispatch, activeTab]);

  return (
    <div className={s.root} ref={containerRef}>
      <MainHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showAddAccountBtn={showAddAccountBtn}
        handleAddAccount={handleAddAccount}
        handleUpload={handleUpload}
        isLoading={isLoading}
        setIsUnknownTransaction={setIsUnknownTransaction}
      />

      <div className={s.queryPanel}>
        <Search isFetching={isFetching} searchValue={searchQuery} setSearchQuery={setSearchQuery} />

        <FiltersContainer type={activeTab} isFetching={isFetching} />
      </div>

      <div className={s.container}>
        <InfiniteScroll
          dataLength={allRows.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          scrollableTarget="scrollableDiv"
          style={{ overflow: allRows.length === 0 ? 'hidden' : 'auto' }}
        >
          <Table
            type={activeTab}
            list={allRows}
            isLoading={isLoading}
            isFetching={isFetching}
            error={error}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Main;
