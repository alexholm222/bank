import { Route, Routes } from 'react-router-dom';

import s from './App.module.scss';

//components
import Main from './pages/Main/Main';
import ModalManager from 'components/ModalManager/ModalManager';

const App = () => {
  return (
    <div id="scrollableDiv" className={s.root}>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* Удали дублирование:
        <Route path="/" element={<Main />} /> */}
      </Routes>

      {/* Модальный менеджер (работает во всём приложении) */}
      <ModalManager />
    </div>
  );
};

export default App;
