import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './components/errors/ErrorBoundary.jsx';
import './style.css';

(function() {
  const container = document.getElementById('root');
  if (!container) {
    console.error("The root element was not found");
    return;
  }
  
  if (window.__REACT_ROOT__) {
    window.__REACT_ROOT__.render(
      <StrictMode>
        <BrowserRouter>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </StrictMode>
    );
    return;
  }
  
  const root = createRoot(container);
  window.__REACT_ROOT__ = root;
  
  root.render(
    <StrictMode>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </StrictMode>
  );
})();

