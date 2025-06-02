import Logo from '/assets/Logo.png'
import CreatePasswordForm from '../components/CreatePasswordForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-6 animate-fadeIn">
          <img className="h-16 lg:h-20" src={Logo} alt="Logo" />
        </div>
        
        <div className="w-full bg-gray-900 rounded-lg p-8 flex flex-col items-center animate-slideUp">
          <h1 className="text-2xl font-bold text-white mb-2">Criar nova senha</h1>
          <p className="text-gray-400 mb-8">Digite sua nova senha</p>
          
          <CreatePasswordForm />
        </div>
      </div>
    </div>
  );
}

export default App;