import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.scss';
import Homepage from './pages/Homepage/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <Homepage />
  </StrictMode>,
);
