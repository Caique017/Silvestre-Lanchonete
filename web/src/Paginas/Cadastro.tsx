import Logo from '/assets/Logo.png'
import RegisterForm from '../components/RegisterForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-6 animate-fadeIn">
          <img className="h-16 lg:h-20" src={Logo} alt="Logo" />
        </div>
        
        <div className="w-full bg-gray-900 rounded-lg p-1 flex flex-col items-center animate-slideUp">
          <h1 className="text-2xl font-bold text-white mb-2">Cadastre-se</h1>
          <p className="text-gray-400">
            Pronto para fazer seus pedidos de forma rápida e prática?
          </p>
          <p className="text-gray-400 mb-8">Preencha os dados abaixo e comece agora mesmo!</p>
          
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default App;