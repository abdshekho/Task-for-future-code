import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { storeApp } from "./redux/store"

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <React.StrictMode>
    <Provider store={ storeApp }>

      <App />
    </Provider>
  </React.StrictMode>
);

