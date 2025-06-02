import React from 'react';
import { FcGoogle } from 'react-icons/fc';

interface SocialLoginButtonProps {
  provider: 'google';
  onClick: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 py-3 border border-gray-700 rounded-md hover:bg-gray-800 transition"
    >
      {provider === 'google' && (
        <>
          <FcGoogle size={24} />
          <span className="text-white">Continuar com Google</span>
        </>
      )}
    </button>
  );
};

export default SocialLoginButton;