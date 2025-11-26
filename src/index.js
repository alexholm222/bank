import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './redux/store';

import './index.css';
import { ErrorBoundary } from 'components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root_bank'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="new/bank">
      <Provider store={store}>
        <ErrorBoundary fallback={<div>Произошла ошибка. Пожалуйста, обновите страницу.</div>}>
          <App />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
window.onerror = function (message, source, lineno, colno, error) {
  console.error('Global JS error:', { message, source, lineno, colno, error });
};
window.onunhandledrejection = function (event) {
  console.error('Unhandled promise rejection:', event.reason);
};
