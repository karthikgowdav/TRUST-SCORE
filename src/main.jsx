import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { TrustScoreProvider } from './context/TrustScoreContext'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TrustScoreProvider>
        <App />
      </TrustScoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
)