// tableDataSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  extractions: [],
  accounts: [],
};

const tableDataSlice = createSlice({
  name: 'tableData',
  initialState,
  reducers: {
    setTabData: (state, action) => {
      const { tab, data } = action.payload;
      if (tab === 'transactions') state.transactions = data;
      if (tab === 'extractions') state.extractions = data;
      if (tab === 'accounts') state.accounts = data;
    },

    removeTransactionById: (state, action) => {
      const idToRemove = action.payload;
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== idToRemove
      );
    },
  },
});

export const { setTabData, removeTransactionById } = tableDataSlice.actions;
export default tableDataSlice.reducer;
