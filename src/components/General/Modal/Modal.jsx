import { useEffect, useRef, useState } from 'react';
//styles
import classNames from 'classnames';

import s from './Modal.module.scss';

const Modal = ({ isOpen, onClose, children }) => {
  const [animate, setAnimate] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => setAnimate(true), 10);
    else setAnimate(false);
  }, [isOpen]);

  useEffect(() => {
    const handleClose = () => {
      setAnimate(false);
      setTimeout(() => {
        onClose();
      }, 200);
    };
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={classNames(s.root, animate && s.anim)}>
      <div className={classNames(s.modal, animate && s.anim)} ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
