import { useNavigate } from 'react-router-dom'; // 🚨 Importante
import Logo from '/assets/Logo.png';
import LoginForm from '../components/LoginForm';

function App() {
  const navigate = useNavigate(); // 🔄 Para redirecionar

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-6 animate-fadeIn">
          <img className="h-16 lg:h-20" src={Logo} alt="Logo" />
        </div>

        <div className="w-full bg-gray-900 rounded-lg p-8 flex flex-col items-center animate-slideUp">
          <h1 className="text-2xl font-bold text-white mb-2">Bem-vindo à Silvestre Lanchonete</h1>
          <p className="text-gray-400 mb-8">Entre agora e acesse sua conta.</p>

          <LoginForm />

          {/* Botão de registro */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Ainda não tem uma conta?{' '}
            <button
              type="button"
              onClick={() => navigate('/cadastro')}
              className="text-orange-500 hover:underline"
            >
              Registre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
