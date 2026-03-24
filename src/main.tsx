import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "./styles/responsive.css"

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("No se encontro el elemento 'root'. Asegurate de que esté en tu index.html")
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
