import { useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// Components
import Main from './pages/Main/Main';
import ScrollToTopButton from 'components/General/ScrollToTopBtn/ScrollToTopBtn';
import ModalManager from 'components/ModalManager/ModalManager';
// Styles
import s from './App.module.scss';

const App = () => {
  const scrollRef = useRef(null);

  return (
    <div className={s.root} ref={scrollRef} id="scrollableDiv">
      {/* Основные маршруты */}
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>

      <Routes>
        <Route path="/statements" element={<Main />} />
      </Routes>

      {/* Глобальные модалки */}
      <ModalManager />

      {/* Уведомления */}
      <ToastContainer position="top-center" hideProgressBar closeOnClick pauseOnHover limit={3} />

      {/* Кнопка прокрутки вверх */}
      <ScrollToTopButton scrollContainerRef={scrollRef} />
    </div>
  );
};

export default App;
