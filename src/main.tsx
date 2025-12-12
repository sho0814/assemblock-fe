import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import './fonts/fonts.css'


const container = document.getElementById('root');

if (!container) {
  throw new Error("Failed to find the root element with ID 'root'.");
}

ReactDOM.createRoot(container).render(
  // <React.StrictMode> 배포 단계에서 반드시 해제!!
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);
