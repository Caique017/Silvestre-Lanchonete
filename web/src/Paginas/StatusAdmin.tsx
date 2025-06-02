import { useState } from 'react';
import Logo from '/assets/Logo.png';

const statusEtapas = [
  'Pedido em preparação',
  'Pedido pronto',
  'Pedido em rota de entrega',
];

const AdminPedido = () => {
  const [statusAtual, setStatusAtual] = useState(0);

  const pedido = {
    numero: 11,
    nome: 'Pizza 25cm',
    descricao:
      'Broto 25cm, MassaTradicional, Borda região, Catupiry da Casa, Batata Crunch, Pepperoni',
    valor: 28.0,
  };

  const avancarStatus = () => {
    if (statusAtual < statusEtapas.length - 1) {
      setStatusAtual((prev) => prev + 1);
    }
  };

  const voltarStatus = () => {
    if (statusAtual > 0) {
      setStatusAtual((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-6">
        <img className="h-16 lg:h-20" src={Logo} alt="Logo" />

        <div className="bg-gray-800 p-8 rounded-xl w-full max-w-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Painel do Admin</h2>

          <div className="space-y-6 mb-8">
            {statusEtapas.map((etapa, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === statusAtual
                      ? 'bg-green-500 text-black'
                      : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  {index === statusAtual ? '✓' : ''}
                </div>
                <div>
                  <p className="font-semibold">{etapa}</p>
                  <p className="text-sm text-gray-400">
                    {index < statusAtual
                      ? 'Concluído'
                      : index === statusAtual
                      ? 'Em andamento'
                      : 'Pendente'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <hr className="w-full border-gray-700 mb-4" />

          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Pedido Nº {pedido.numero}</h3>
            <div className="flex justify-between mb-1">
              <p>1x {pedido.nome}</p>
              <p className="font-medium">R$ {pedido.valor.toFixed(2)}</p>
            </div>
            <p className="text-sm text-gray-400">{pedido.descricao}</p>
          </div>

          <div className="flex justify-between">
            <button
              onClick={voltarStatus}
              disabled={statusAtual === 0}
              className={`px-4 py-2 rounded-md font-semibold ${
                statusAtual === 0
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600'
              }`}
            >
              Voltar
            </button>
            <button
              onClick={avancarStatus}
              disabled={statusAtual === statusEtapas.length - 1}
              className={`px-4 py-2 rounded-md font-semibold ${
                statusAtual === statusEtapas.length - 1
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              Avançar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPedido;
