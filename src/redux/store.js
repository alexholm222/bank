import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { apiActions } from './apiActions';
import modalReducer from './modal/modalSlice';
import filtersSlice from './filters/slice';
//slice
/* import filtersSlice from './filters/slice'; */

export const store = configureStore({
  reducer: {
    filters: filtersSlice,

    [apiActions.reducerPath]: apiActions.reducer,
    modal: modalReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiActions.middleware),
});

setupListeners(store.dispatch);
