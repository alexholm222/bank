import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import filtersSlice from './filters/slice';
import dateRangeReducer from './filters/dateRangeSlice';
import modalReducer from './modalManager/modalSlice';
import tableDataReducer from './tableData/tableDataSlice';
import companiesListReducer from '../redux/filters/companiesListSlice';
import unknownTransactionsSliceReducer from './filters/unknownTransactionsSlice';

import { transactionsApi } from './services/transactionsApi';
import { extractionsApi } from './services/extractionsApi';
import { filtersApiActions } from './services/filtersApiActions';
import { dadataApiActions } from './services/dadataApiActions';
import { accountsApi } from './services/accountsApi';

export const store = configureStore({
  reducer: {
    filters: filtersSlice,
    dateRange: dateRangeReducer,
    modal: modalReducer,
    tableData: tableDataReducer,
    companiesList: companiesListReducer,
    unknownTransactions: unknownTransactionsSliceReducer,

    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [extractionsApi.reducerPath]: extractionsApi.reducer,
    [filtersApiActions.reducerPath]: filtersApiActions.reducer,
    [dadataApiActions.reducerPath]: dadataApiActions.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(transactionsApi.middleware)
      .concat(extractionsApi.middleware)
      .concat(filtersApiActions.middleware)
      .concat(accountsApi.middleware)
      .concat(dadataApiActions.middleware),
});

setupListeners(store.dispatch);
