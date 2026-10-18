import React from 'react';
import { createRoot } from 'react-dom/client';
import MacPortfolio from './MacPortfolio';
import './macos.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MacPortfolio />
  </React.StrictMode>
);
