import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ArgosApp } from './ArgosApp';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <ArgosApp />
    </BrowserRouter>
  // </React.StrictMode>
);
