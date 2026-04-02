import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Router from "react-router-dom"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router.HashRouter>
      <App />
    </Router.HashRouter>
  </StrictMode>,
)
