// src/components/auth/ResetPasswordForm.tsx (ou o caminho que preferir)
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://api-docker-141213034707.us-central1.run.app';

const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSolicitarRedefinicao = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    setCarregando(true);

    try {
      await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email }); //
      
      setMensagem('Se um e-mail correspondente for encontrado, um código de verificação será enviado.');
      setTimeout(() => {
        navigate('/verificar-codigo', { state: { email } });
      }, 3000);

    } catch (err: any) {
      console.error('Erro ao solicitar redefinição de senha:', err);
      setErro(err.response?.data || err.response?.data?.message || 'Falha ao solicitar redefinição de senha. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {mensagem && <p className="text-green-400 bg-green-900/50 p-3 rounded mb-4 text-center text-sm">{mensagem}</p>}
      {erro && <p className="text-red-400 bg-red-900/50 p-3 rounded mb-4 text-center text-sm">{erro}</p>}
      
      <form onSubmit={handleSolicitarRedefinicao} className="flex flex-col gap-4">
        <div className="space-y-2">
          <label htmlFor="email-reset" className="block text-sm font-medium text-gray-300 mb-1">
            Endereço de e-mail
          </label>
          <input
            id="email-reset"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErro(''); setMensagem('');}}
            placeholder="seuemail@exemplo.com"
            className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
            required
            disabled={carregando}
          />
        </div>
        
        <button 
          type="submit"
          disabled={carregando}
          className="w-full py-3 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {carregando ? 'Enviando...' : 'Enviar Código de Redefinição'}
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-gray-400">
          Lembrou sua senha?{' '}
          <Link to="/login" className="text-orange-500 hover:text-orange-400 font-medium transition-colors duration-200 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordForm;