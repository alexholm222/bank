import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import filtersSlice from './filters/slice';
import dateRangeReducer from './filters/dateRangeSlice';
import modalReducer from './modal/modalSlice';
import tableDataReducer from './tableData/tableDataSlice';
import companiesListReducer from '../redux/filters/companiesListSlice';

import { transactionsApi } from './services/transactionsApi';
import { extractionsApi } from './services/extractionsApi';
import { filtersApiActions } from './services/filtersApiActions';

export const store = configureStore({
  reducer: {
    filters: filtersSlice,
    dateRange: dateRangeReducer,
    modal: modalReducer,
    tableData: tableDataReducer,
    companiesList: companiesListReducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [extractionsApi.reducerPath]: extractionsApi.reducer,
    [filtersApiActions.reducerPath]: filtersApiActions.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(transactionsApi.middleware)
      .concat(extractionsApi.middleware)
      .concat(filtersApiActions.middleware),
});

setupListeners(store.dispatch);
