import s from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
//components
import Main from "./pages/Main/Main";
import Detail from "./pages/Detail/Detail";

const App = () => {

  return (
    <div
      id="scrollableDiv"
      className={s.root}
    >
      <Routes>
        <Route
          path="/"
          element={<Main />}
        />

        <Route
          path="/detail/:id"
          element={<Detail />}
        />
      </Routes>
    </div>
  );
};

export default App;
