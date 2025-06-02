// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Paginas/Home';
import Login from './Paginas/Login';
import Cadastro from './Paginas/Cadastro';
import { Header } from './components/header_cardapio'; // Componente que mostra o cardápio
import { Admin } from './Paginas/Admin'; // <-- IMPORTE SUA PÁGINA ADMIN (ajuste o caminho se necessário)
import RedefinirSenha from './Paginas/RedefinirSenha';
import Autenticacao from './Paginas/Autenticacao';
import CriarSenha from './Paginas/CriarSenha';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Rota para o cardápio/menu principal */}
        <Route path="/menu" element={<Header />} /> 
        
        {/* Nova Rota para Administração de Produtos */}
        <Route path="/admin" element={<Admin />} /> 

        <Route path="/forgot-password" element={<RedefinirSenha />} />
        <Route path="/verificar-codigo" element={<Autenticacao />} />
        <Route path="/criar-nova-senha" element={<CriarSenha />} />
      </Routes>
    </BrowserRouter>
  );
}