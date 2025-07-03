import { Route, Routes } from 'react-router-dom';

import s from './App.module.scss';

//components
import Main from './pages/Main/Main';

const App = () => {
  return (
    <div id="scrollableDiv" className={s.root}>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
};

export default App;
