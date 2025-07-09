import { useState, useEffect } from 'react';
import { ReactComponent as IconChevronUp } from 'assets/icons/iconChevronUp.svg';
import s from './ScrollToTopBtn.module.scss';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={s.wrapper}>
      {isVisible && (
        <button onClick={scrollToTop} className={s.button} aria-label="Наверх">
          <IconChevronUp className={s.icon} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
