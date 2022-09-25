import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthUserProvider } from './contexts/authStoreUser';
import { SeriesListProvider } from './contexts/seriesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SeriesListProvider>
    <AuthUserProvider>
      <App />
    </AuthUserProvider>
    </SeriesListProvider>
  </React.StrictMode>
);
