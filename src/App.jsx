import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ModalManager from 'components/ModalManager/ModalManager';

import s from './App.module.scss';

//components
import Main from './pages/Main/Main';

const App = () => {
  return (
    <div id="scrollableDiv" className={s.root}>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>

      {/* Модальный менеджер (работает во всём приложении) */}
      <ModalManager />
      {/* Toast container (работает во всём приложении) */}
      <ToastContainer position="top-center" hideProgressBar closeOnClick pauseOnHover limit={3} />
    </div>
  );
};

export default App;
//Filters (модалка) → Redux (filters) → Main → RTK Query → API → Таблица
