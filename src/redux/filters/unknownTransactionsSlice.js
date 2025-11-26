import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const unknownTransactionsSlice = createSlice({
  name: 'unknownTransactions',
  initialState,
  reducers: {
    setIsUnknownTransaction: (_, action) => action.payload,
  },
});

export const { setIsUnknownTransaction } = unknownTransactionsSlice.actions;
export default unknownTransactionsSlice.reducer;
