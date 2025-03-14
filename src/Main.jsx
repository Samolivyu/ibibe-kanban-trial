import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './components/errors/ErrorBoundary.jsx';
import './style.css';

const Main = () => {
  const container = document.getElementById('root');
  if (!container) {
    console.error("The root element was not found");
    return null;
  }
  
  // CreateRoot allows for concurrent mode and is the modern way to render React DOM
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </StrictMode>
  );
  
  return null; // The Main component just performs the rendering, nothing to return.
};

export default Main;