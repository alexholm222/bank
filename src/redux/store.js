import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { apiActions } from './apiActions';
import dateRangeReducer from './filters/dateRangeSlice';
import filtersSlice from './filters/slice';
import modalReducer from './modal/modalSlice';
//slice
/* import filtersSlice from './filters/slice'; */

export const store = configureStore({
  reducer: {
    filters: filtersSlice,
    dateRange: dateRangeReducer,
    modal: modalReducer,
    [apiActions.reducerPath]: apiActions.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiActions.middleware),
});

setupListeners(store.dispatch);
