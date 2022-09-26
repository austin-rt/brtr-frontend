import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { CartProvider } from './context/CartContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <React.StrictMode>
      <CartProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </CartProvider>
    </React.StrictMode>
  </Router>
)
