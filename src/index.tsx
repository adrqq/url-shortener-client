/* eslint-disable @typescript-eslint/no-unused-vars */
import { HashRouter as Router } from 'react-router-dom';
import React from 'react';
import { useAppDispatch } from './hooks/redux';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import './reset.css';
import App from './App';
import { setupStore } from './redux/store';
import ReactDOM from 'react-dom';

const store = setupStore();

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </>
);
