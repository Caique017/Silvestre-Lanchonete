// src/components/auth/CreatePasswordForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Certifique-se de ter lucide-react instalado
import axios from 'axios';

const API_BASE_URL = 'https://api-docker-141213034707.us-central1.run.app';

const CreatePasswordForm: React.FC = () => {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // O 'tokenRedefinicao' aqui é o código de 6 dígitos que foi validado
  const tokenRedefinicao = location.state?.tokenRedefinicao; 
  // O email também pode ser útil se sua API precisar dele nesta etapa, embora o DTO da API não o inclua explicitamente.
  // PasswordResetTokenDTO(String token, String newPassword)
  // const email = location.state?.email; 

  useEffect(() => {
    if (!tokenRedefinicao) {
      navigate('/forgot-password', { replace: true });
    }
  }, [tokenRedefinicao, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    if (senha.length < 6) { // Adicione suas regras de validação de senha aqui
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }
    setCarregando(true);

    try {
      await axios.post(`${API_BASE_URL}/auth/reset-password`, { //
        token: tokenRedefinicao,
        newPassword: senha,
      });

      setMensagem('Senha redefinida com sucesso! Você será redirecionado para o login.');
      setTimeout(() => {
        navigate('/login', { state: { mensagemSucesso: 'Sua senha foi alterada com sucesso. Faça login com sua nova senha.' }});
      }, 2500);

    } catch (err: any) {
      console.error('Erro ao redefinir senha:', err);
      setErro(err.response?.data || err.response?.data?.message || 'Falha ao redefinir a senha. O token pode ser inválido ou ter expirado.');
    } finally {
      setCarregando(false);
    }
  };

  const toggleMostrarSenha = () => setMostrarSenha(!mostrarSenha);
  const toggleMostrarConfirmarSenha = () => setMostrarConfirmarSenha(!mostrarConfirmarSenha);

  return (
    <div className="w-full max-w-md">
      {mensagem && <p className="text-green-400 bg-green-900/50 p-3 rounded mb-4 text-center text-sm">{mensagem}</p>}
      {erro && <p className="text-red-400 bg-red-900/50 p-3 rounded mb-4 text-center text-sm">{erro}</p>}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="space-y-1 relative">
           <label htmlFor="nova-senha" className="text-sm text-gray-400 block mb-1">Nova Senha</label>
          <input
            id="nova-senha"
            type={mostrarSenha ? 'text' : 'password'}
            value={senha}
            onChange={(e) => {setSenha(e.target.value); setErro('');}}
            placeholder="Digite sua nova senha"
            className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white pr-12"
            required
            disabled={carregando}
            minLength={6} // Exemplo de validação HTML
          />
          <button 
            type="button"
            className="absolute right-3 top-[calc(50%+12px)] transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
            onClick={toggleMostrarSenha}
            aria-label={mostrarSenha ? 'Esconder senha' : 'Mostrar senha'}
          >
            {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="space-y-1 relative">
          <label htmlFor="confirmar-nova-senha" className="text-sm text-gray-400 block mb-1">Confirmar Nova Senha</label>
          <input
            id="confirmar-nova-senha"
            type={mostrarConfirmarSenha ? 'text' : 'password'}
            value={confirmarSenha}
            onChange={(e) => {setConfirmarSenha(e.target.value); setErro('');}}
            placeholder="Confirme sua nova senha"
            className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white pr-12"
            required
            disabled={carregando}
            minLength={6}
          />
          <button 
            type="button"
            className="absolute right-3 top-[calc(50%+12px)] transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
            onClick={toggleMostrarConfirmarSenha}
            aria-label={mostrarConfirmarSenha ? 'Esconder senha' : 'Mostrar senha'}
          >
            {mostrarConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        <button 
          type="submit"
          disabled={carregando}
          className="w-full py-3 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {carregando ? 'Salvando...' : 'Confirmar Alterações'}
        </button>
      </form>
        <div className="mt-8 text-center">
            <Link to="/login" className="text-sm text-orange-500 hover:text-orange-400 font-medium transition-colors duration-200 hover:underline">
                Voltar para o Login
            </Link>
        </div>
    </div>
  );
};

export default CreatePasswordForm;