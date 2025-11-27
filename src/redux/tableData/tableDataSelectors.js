import { createSelector } from '@reduxjs/toolkit';
//mock
import { mockData } from 'mock/mockData';

export const selectTransactions = (state) => state.tableData.transactions;
export const selectExtractions = (state) => state.tableData.extractions;
export const selectAccounts = (state) => state.tableData.accounts;

export const makeSelectAllRows = (activeTab) =>
  createSelector(
    (state) => state.tableData,
    (tableData) => {
      switch (activeTab) {
        case 'transactions':
          return tableData.transactions;
        case 'extractions':
          return tableData.extractions;
        case 'accounts':
          return tableData.accounts;
        default:
          return [];
      }
    }
  );
