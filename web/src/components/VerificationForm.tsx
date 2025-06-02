// src/components/auth/VerificationForm.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://api-docker-141213034707.us-central1.run.app';

const VerificationForm: React.FC = () => {
  const [codigo, setCodigo] = useState<string[]>(Array(6).fill(''));
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [reenviando, setReenviando] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password', { replace: true });
      return;
    }
    inputRefs.current[0]?.focus();
  }, [email, navigate]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value) || carregando) return;
    const novoCodigo = [...codigo];
    novoCodigo[index] = value.slice(-1);
    setCodigo(novoCodigo);
    setErro('');
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (carregando) return;
    if (e.key === 'Backspace') {
      e.preventDefault();
      const novoCodigo = [...codigo];
      if (novoCodigo[index]) {
        novoCodigo[index] = '';
        setCodigo(novoCodigo);
      } else if (index > 0) {
        novoCodigo[index - 1] = '';
        setCodigo(novoCodigo);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (carregando) return;
    e.preventDefault();
    const dadosColados = e.clipboardData.getData('text').slice(0, 6).replace(/[^0-9]/g, '');
    if (dadosColados.length > 0) {
      const novoCodigo = Array(6).fill('');
      for (let i = 0; i < dadosColados.length && i < 6; i++) {
        novoCodigo[i] = dadosColados[i];
      }
      setCodigo(novoCodigo);
      const focoIndex = Math.min(5, dadosColados.length -1); // Foca no último preenchido ou no 6º
      if(dadosColados.length === 6) inputRefs.current[5]?.focus();
      else if (dadosColados.length < 6 && dadosColados.length > 0) inputRefs.current[focoIndex+1]?.focus();
      else inputRefs.current[0]?.focus();

    }
    setErro('');
  };

  const handleVerificacao = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    setCarregando(true);
    const codigoVerificacao = codigo.join('');

    if (codigoVerificacao.length !== 6) {
      setErro('Por favor, insira um código de 6 dígitos.');
      setCarregando(false);
      return;
    }

    try {
      // O DTO no backend para /auth/validate-code é CodeValidationRequestDTO(String token)
      // A API espera um campo "token" no corpo do JSON.
      await axios.post(`${API_BASE_URL}/auth/validate-code`, { //
        token: codigoVerificacao 
      });
      
      setMensagem('Código verificado com sucesso!');
      // Passamos o 'codigoVerificacao' como 'tokenRedefinicao' para a próxima etapa
      setTimeout(() => {
        navigate('/criar-nova-senha', { state: { tokenRedefinicao: codigoVerificacao, email } });
      }, 1500);

    } catch (err: any) {
      console.error('Erro ao verificar código:', err);
      setCodigo(Array(6).fill(''));
      inputRefs.current[0]?.focus();
      setErro(err.response?.data || err.response?.data?.message || 'Código de verificação inválido ou expirado.');
    } finally {
      setCarregando(false);
    }
  };

  const handleReenviarCodigo = async () => {
    setErro('');
    setMensagem('');
    setReenviando(true);
    try {
        await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email }); //
        setMensagem('Um novo código de verificação foi enviado para o seu e-mail.');
    } catch (err: any) {
        console.error('Erro ao reenviar código:', err);
        setErro(err.response?.data || err.response?.data?.message || 'Falha ao reenviar o código. Tente novamente.');
    } finally {
        setReenviando(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-white mb-2">Verificar Código</h2>
      <p className="text-gray-400 text-center text-sm mb-6">
        Digite o código de 6 dígitos enviado para <strong className="text-orange-400">{email || "seu e-mail"}</strong>.
      </p>
      {mensagem && <p className="text-green-400 bg-green-900/50 p-3 rounded mb-4 text-center text-sm">{mensagem}</p>}
      {erro && <p className="text-red-400 bg-red-900/50 p-3 rounded mb-4 text-center text-sm">{erro}</p>}
      
      <form onSubmit={handleVerificacao} className="flex flex-col gap-6">
        <div className="flex justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
          {codigo.map((digito, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digito}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-semibold bg-transparent border-2 border-gray-700 rounded-md focus:outline-none focus:border-orange-500 text-white transition-colors duration-200 disabled:opacity-50"
              required
              disabled={carregando}
              aria-label={`Dígito ${index + 1} do código de verificação`}
            />
          ))}
        </div>
        
        <button 
          type="submit"
          disabled={carregando || codigo.join('').length !== 6}
          className="w-full py-3 bg-orange-600 text-white rounded-md font-medium hover:bg-orange-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {carregando ? 'Verificando...' : 'Verificar'}
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Não recebeu o código?{' '}
          <button 
            onClick={handleReenviarCodigo}
            disabled={reenviando || carregando}
            className="text-orange-500 hover:text-orange-400 font-medium transition-colors duration-200 hover:underline disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {reenviando ? 'Reenviando...' : 'Reenviar'}
          </button>
        </p>
         <p className="mt-4 text-sm">
            <Link to="/forgot-password" 
                className="text-gray-400 hover:text-gray-300 transition-colors duration-200 hover:underline">
                Voltar para inserir e-mail
            </Link>
        </p>
      </div>
    </div>
  );
};

export default VerificationForm;