import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; 
const rootElement = document.getElementById('root');


if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error("Elemento com ID 'root' não encontrado no index.html. A aplicação React não pode ser montada.");
}