import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Adicionado useLocation
import SocialLoginButton from './SocialLoginButton';

const API_BASE_URL = 'https://api-docker-141213034707.us-central1.run.app';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Usar useLocation para obter search params de forma reativa

  // Função para login tradicional (mantida como antes)
  const handleTraditionalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      const { name, token, refreshToken } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      if (name) localStorage.setItem('name', name);
      console.log('Usuário autenticado com email/senha:', name);
      navigate('/menu');
    } catch (err: any) {
      console.error('Erro ao fazer login tradicional:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.name || err.response.data?.message || 'Email ou senha inválidos.');
      } else {
        setError('Email ou senha inválidos. Verifique suas credenciais.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Função para iniciar o fluxo de autenticação com Google (mantida como antes)
  const handleGoogleLogin = () => {
    setError('');
    setIsLoading(true);
    window.location.href = `${API_BASE_URL}/auth/login/google`;
  };

  // Função para processar o código de autorização retornado pelo Google
  useEffect(() => {
    console.log('LoginForm useEffect disparado. Pathname atual:', location.pathname, 'Search params:', location.search);
    
    const urlParams = new URLSearchParams(location.search); // Usar location.search do useLocation
    const code = urlParams.get('code');
    const errorParam = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');

    // Condição crucial: o componente DEVE estar na rota correta E o 'code' DEVE estar presente.
    // Ajuste '/login' se sua rota de login/callback for diferente.
    if (location.pathname.endsWith('/login') && code && !errorParam) {
      console.log('Código do Google detectado na URL de login:', code);
      // Verifica se já está carregando para evitar múltiplas chamadas se o componente remontar rapidamente
      if (!isLoading) {
        setIsLoading(true);
        validateAuthCode(code);
      }
      // Limpa os parâmetros da URL para evitar reprocessamento e não mostrar o código na barra de endereço
      // Faz isso após um pequeno delay para garantir que o processamento iniciou
      setTimeout(() => {
        window.history.replaceState({}, document.title, location.pathname);
        console.log('Parâmetros da URL limpos.');
      }, 100);
    } else if (errorParam) {
      console.error('Erro retornado pelo Google na URL:', errorParam, errorDescription);
      setError(decodeURIComponent(errorDescription || 'Falha na autenticação com Google.'));
      setIsLoading(false);
      window.history.replaceState({}, document.title, location.pathname);
    } else if (code && !location.pathname.endsWith('/login')) {
        console.warn(`Código do Google detectado (${code}), mas o pathname atual (${location.pathname}) não é a página de login esperada. O código não será processado por este LoginForm.`);
    }

  // Adicionar location.search e isLoading como dependências para reavaliar se eles mudarem.
  // No entanto, para processar o 'code' apenas uma vez após o redirect,
  // o array vazio é geralmente preferido, e a lógica de limpeza da URL ajuda.
  // Se você tiver problemas com o useEffect não redisparando quando deveria, pode adicionar location.search.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]); // Reage a mudanças na URL

  // Função para validar o código de autorização do Google com a API
  const validateAuthCode = async (code: string) => {
    console.log('FRONTEND: Enviando código do Google para o backend:', code);
    try {
      const validationUrl = new URL(`${API_BASE_URL}/auth/login/google/authorized`);
      validationUrl.searchParams.append('code', code);

      console.log('FRONTEND: URL de validação:', validationUrl.toString());

      const response = await fetch(validationUrl.toString(), {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      console.log('FRONTEND: Resposta do fetch recebida, status:', response.status);
      const responseBodyText = await response.text();
      console.log('FRONTEND: Corpo da resposta (texto):', responseBodyText);

      let data;
      try {
        data = JSON.parse(responseBodyText);
      } catch (parseError) {
        console.error('FRONTEND: Erro ao parsear JSON da resposta:', parseError, "\nCorpo da resposta:", responseBodyText);
        throw new Error('Resposta inválida do servidor de autenticação. Verifique o console do backend e a aba de Rede.');
      }

      if (!response.ok) {
        console.error('FRONTEND: Erro da API ao validar código do Google. Dados da resposta:', data);
        throw new Error(data.message || data.name || `Falha na autenticação com Google (status: ${response.status}).`);
      }
      
      console.log('FRONTEND: Dados recebidos do backend:', data);
      if (data.acessToken) localStorage.setItem('token', data.acessToken);
      if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
      
      console.log('FRONTEND: Usuário autenticado com Google. Redirecionando para /menu...');
      navigate('/menu');
    } catch (error: any) {
      console.error('FRONTEND: Erro dentro de validateAuthCode:', error);
      setError(error.message || 'Falha crítica na autenticação com Google.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleTraditionalLogin} className="flex flex-col gap-4">
        {error && (
          <p className="text-red-400 bg-red-900/50 p-3 rounded text-center text-sm border border-red-600">
            {error}
          </p>
        )}
        {isLoading && ( // Adiciona um indicador de carregamento mais visível
          <div className="text-center py-2 text-orange-400">
            <p>Processando login...</p>
          </div>
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
          placeholder="usuario@exemplo.com"
          className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
          disabled={isLoading}
        />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            placeholder="Senha"
            className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-md text-white pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
         {/* Link para Esqueceu a Senha */}
        <div className="mt-2 mb-4 text-sm w-full text-center"> 
          <Link 
            to="/forgot-password" 
            className="font-medium text-zinc-400 hover:text-zinc-300"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition disabled:opacity-70"
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-700" />
        <span className="px-4 text-sm text-gray-500">ou</span>
        <div className="flex-grow h-px bg-gray-700" />
      </div>
      <SocialLoginButton 
        provider="google" 
        onClick={handleGoogleLogin} 
      />
    </div>
  );
};

export default LoginForm;