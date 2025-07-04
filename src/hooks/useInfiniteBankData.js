import { useEffect, useState } from 'react';
// import { useGetWorkersInfiniteQuery } from '../../redux/performersApiActions';

export const useInfiniteBankData = ({
  paramsTransactions,
  paramsExtractions,
  paramsAccounts,
  paramsSearch,
  tableType,
  searchValue,
}) => {
  const [transactions, setTransactions] = useState([]);
  const [extractions, setExtractions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [fetchTransactions, setFetchTransactions] = useState(false);
  const [fetchExtractions, setFetchExtractions] = useState(false);
  const [fetchAccounts, setFetchAccounts] = useState(false);
  const [fetchSearch, setFetchSearch] = useState(false);
  const [notFound, setNoFound] = useState(false);

  //запросы раскоментить после их добавления

  //   const {
  //     data: transactionsList,
  //     currentData: currentDataTransactions,
  //     fetchNextPage: fetchNextPageTransactions,
  //     isFetching: isFetchingTransactions,
  //     isLoading: isLoadingTransactions,
  //   } = useGetTransactionsInfiniteQuery(paramsTransaction);
  //   const {
  //     data: extractionsList,
  //     currentData: currentDataExtractions,
  //     fetchNextPage: fetchNextPageExtractions,
  //     isFetching: isFetchingExtractions,
  //     isLoading: isLoadingExtractions,
  //   } = useGetExtractionsInfiniteQuery(paramsExtractions);
  //   const {
  //     data: accountsList,
  //     currentData: currentDataAccounts,
  //     fetchNextPage: fetchNextPageAccounts,
  //     isFetching: isFetchingAccounts,
  //     isLoading: isLoadingAccounts,
  //   } = useGetAccountsInfiniteQuery(paramsExtractions);
  //   const {
  //     data: searchData,
  //     currentData: currentDataSearch,
  //     fetchNextPage: fetchNextPageSearch,
  //     isFetching: isFetchingSearch,
  //   } = useGetInfiniteQuery(paramsSearch);

  //добавление транзакций
  //   useEffect(() => {
  //     const result = transactionsList?.pages?.map((el) => el.data)?.flat() ?? [];
  //     setTransactions(result);
  //   }, [transactionsList]);

  //   //добавление выписок
  //   useEffect(() => {
  //     const result = extractionsList?.pages?.map((el) => el.data)?.flat() ?? [];
  //     setExtractions(result);
  //   }, [extractionsList]);

  //   //добавление счетов
  //   useEffect(() => {
  //     const result = accountsList?.pages?.map((el) => el.data)?.flat() ?? [];
  //     setAccounts(result);
  //   }, [accountsList]);

  //   //добавление поиска
  //   useEffect(() => {
  //     if (searchValue?.length > 0 && searchData) {
  //       const result = searchData?.pages?.map((el) => el.data)?.flat() ?? [];
  //       setSearchResult(result);
  //       setNotFound(result.length === 0);
  //     } else {
  //       setSearchResult([]);
  //       setNotFound(false);
  //     }
  //   }, [searchValue, searchData]);

  //   // Флаги загрузки
  //   useEffect(() => {
  //     setFetchTransactions(isFetchingTransactions && !currentTransactions && tableType === 1);
  //   }, [isFetchingTransactions, currentTransactions, tableType]);

  //   useEffect(() => {
  //     setFetchExtractions(isFetchingExtractions && !currentExtractions && tableType === 2);
  //   }, [isFetchingExtractions, currentExtractions, tableType]);

  //   useEffect(() => {
  //     setFetchAccounts(isFetchingAccounts && !currentAccounts && tableType === 3);
  //   }, [isFetchingAccounts, currentAccounts, tableType]);

  //   useEffect(() => {
  //     setFetchSearch(isFetchingSearch && !currentSearch);
  //   }, [isFetchingSearch, currentSearch]);

  //   const loadNextPage = () => {
  //     if (searchValue) {
  //       fetchNextSearch();
  //     } else {
  //       if (tableType === 1) fetchNextTransactions();
  //       if (tableType === 2) fetchNextExtractions();
  //       if (tableType === 3) fetchNextAccounts();
  //     }
  //   };

  return {
    transactions,
    extractions,
    accounts,
    searchResult,
    fetchTransactions,
    fetchExtractions,
    fetchAccounts,
    fetchSearch,
    notFound,
    // loadNextPage,
  };
};
