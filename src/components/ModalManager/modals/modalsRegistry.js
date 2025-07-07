import React from 'react';

export const MODALS = {
  TRANSACTION: React.lazy(() => import('./Transactions/Transaction')),
  ADD_ACCOUNT: React.lazy(() => import('./AddAccount/AddAccountModal')),
  UPLOAD_EXTRACTION: React.lazy(() => import('./UploadExtraction/UploadExtraction')),
  ACCOUNT_INFO: React.lazy(() => import('./AccountInfo/AccountInfoModal')),
  CHANGE_ACCOUNT_DETAIL: React.lazy(() => import('./ChangeDetail/ChangeDetail')),
};
