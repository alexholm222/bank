import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import tableDataReducer from '../redux/tableData/tableDataSlice';
import { tableDataApiActions } from './services/tableDataApiActions';
import dateRangeReducer from './filters/dateRangeSlice';
import filtersSlice from './filters/slice';
import modalReducer from './modal/modalSlice';
import { filtersApiActions } from './services/filtersApiActions';

export const store = configureStore({
  reducer: {
    tableData: tableDataReducer,
    filters: filtersSlice,
    dateRange: dateRangeReducer,
    modal: modalReducer,
    [tableDataApiActions.reducerPath]: tableDataApiActions.reducer,
    [filtersApiActions.reducerPath]: filtersApiActions.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(tableDataApiActions.middleware)
      .concat(filtersApiActions.middleware),
});

setupListeners(store.dispatch);
