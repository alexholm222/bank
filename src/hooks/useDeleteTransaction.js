import { useDeleteTransactionMutation } from '../redux/services/transactionsApi';
import { useDispatch } from 'react-redux';
import { removeTransactionById } from '../redux/tableData/tableDataSlice';

const useDeleteTransaction = () => {
  const [deleteTransaction] = useDeleteTransactionMutation();
  const dispatch = useDispatch();

  const handleDeleteTransaction = async (id, e) => {
    e.stopPropagation();
    try {
      await deleteTransaction({ id }).unwrap();
      dispatch(removeTransactionById(id));
    } catch (error) {
      console.error('Ошибка при удалении транзакции:', error);
      const status = error.status ?? 'Unknown status';
      alert(`Не удалось удалить транзакцию. Код ошибки: ${status}. ${error.originalStatus}`);
    }
  };

  return handleDeleteTransaction;
};

export default useDeleteTransaction;
