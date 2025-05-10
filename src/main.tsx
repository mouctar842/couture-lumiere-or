
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Utilisation du mode concurrent de React pour de meilleures performances
createRoot(document.getElementById("root")!).render(
  <App />
);
