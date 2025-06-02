import Logo from '/assets/Logo.png'
import VerificationForm from '../components/VerificationForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-6 animate-fadeIn">
          <img className="h-16 lg:h-20" src={Logo} alt="Logo" />
        </div>
        
        
          
          <VerificationForm />
        </div>
      </div>
  );
}

export default App;