import { useDispatch, useSelector } from 'react-redux';

import { closeModal, openModal } from '../redux/modal/modalSlice';

export const useModal = () => {
  const dispatch = useDispatch();
  const { activeModal, modalProps } = useSelector((state) => state.modal);

  const showModal = (name, props = {}) => {
    dispatch(openModal({ name, props }));
  };

  const hideModal = () => {
    dispatch(closeModal());
  };

  return { activeModal, modalProps, showModal, hideModal };
};

//перключение внутри модалок
// const MainAccountModal = ({ onClose }) => {
//   const { showModal } = useModal();

//   return (
//     <div className="modal">
//       <h2>Основной счет</h2>
//       <button onClick={() => showModal('NON_MAIN_ACCOUNT')}>Далее</button>
//       <button onClick={onClose}>Закрыть</button>
//     </div>
//   );
// };
