import React from 'react';
import ReactDOM from 'react-dom';

import { useModal } from 'hooks/useModal';

import { MODALS } from './modals/modalsRegistry';

const ModalManager = () => {
  const { activeModal, modalProps, hideModal } = useModal();

  if (!activeModal) return null;

  const ModalComponent = MODALS[activeModal];
  if (!ModalComponent) return null;

  return ReactDOM.createPortal(
    <React.Suspense fallback={null}>
      <ModalComponent {...modalProps} onClose={hideModal} />
    </React.Suspense>,
    document.getElementById('modal-root')
  );
};

export default ModalManager;
