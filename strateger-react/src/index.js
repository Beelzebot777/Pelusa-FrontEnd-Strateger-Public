// Path: strateger-react/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';
import './styles/global.css'; 
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

//! ------------------------ Eviroment Detection --------------------
if (process.env.REACT_APP_MODE_DEVELOPING?.toLowerCase() === 'true') {
  console.log(
    '%cCompiled successfully in Development mode!',
    'color: green; font-weight: bold; font-size: 16px;'
  );
} else {
  console.log(
    '%cCompiled successfully in Production mode!',
    'color: blue; font-weight: bold; font-size: 16px;'
  );
}


root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
