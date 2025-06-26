import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './Components/Context/CartContext.jsx'
import App from './App.jsx'
import { UserProvider } from './Components/Context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </StrictMode>
)
