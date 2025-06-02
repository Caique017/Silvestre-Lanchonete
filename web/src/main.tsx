import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './global.css' // Mantenha seus estilos globais
import { AuthProvider } from './contexts/AuthContent.tsx' // Importe o AuthProvider que criamos

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider> {/* Substitua Auth0ProviderWithNavigate pelo AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
)