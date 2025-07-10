import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import s from './Modal.module.scss';

const Modal = ({ children, onClose, closing }) => {
  const modalRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 10);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className={classNames(s.root, (animate || closing) && s.anim)}>
      <div className={classNames(s.modal, animate && !closing && s.anim)} ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
