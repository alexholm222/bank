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
      if (tab === 1) state.transactions = data;
      if (tab === 2) state.extractions = data;
      if (tab === 3) state.accounts = data;
    },
  },
});

export const { setTabData } = tableDataSlice.actions;
export default tableDataSlice.reducer;
