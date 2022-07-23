import React from 'react';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import {Provider} from 'react-redux';
import {createRoot} from "react-dom/client";

const rootEl: HTMLElement | null = document.getElementById('root')!;
const root = createRoot(rootEl);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
