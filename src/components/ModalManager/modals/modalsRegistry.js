import Transaction from './Transactions/Transaction';
import AddAccountModal from './AddAccount/AddAccountModal';
import UploadExtraction from './UploadExtraction/UploadExtraction';
import AccountInfo from './AccountInfo/AccountInfo';
import ChangeDetail from './ChangeDetail/ChangeDetail';
import BankAccount from './BankAccount/BankAccount';

export const MODALS = {
  TRANSACTION: Transaction,
  ADD_ACCOUNT: AddAccountModal,
  UPLOAD_EXTRACTION: UploadExtraction,
  ACCOUNT_INFO: AccountInfo,
  CHANGE_ACCOUNT_DETAIL: ChangeDetail,
  BANK_ACCOUNT: BankAccount,
};
