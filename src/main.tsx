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
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);
