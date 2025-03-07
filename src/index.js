import React from 'react';
import { createRoot } from 'react-dom/client';
import Main from './Main';

// Get the root element
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Render the application
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);