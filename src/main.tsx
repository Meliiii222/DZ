import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Gestion d'erreur globale pour éviter la page blanche
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Erreur JavaScript:', { message, source, lineno, colno, error });
  return false;
};

window.addEventListener('unhandledrejection', function(event) {
  console.error('Promise rejetée non gérée:', event.reason);
});

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Erreur lors du rendu:', error);
  container.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h1>Erreur de chargement</h1>
      <p>Une erreur s'est produite lors du chargement de l'application.</p>
      <button onclick="window.location.reload()">Recharger la page</button>
    </div>
  `;
}
