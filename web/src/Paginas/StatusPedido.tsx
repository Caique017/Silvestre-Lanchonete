import { useEffect, useState } from 'react';
import Logo from '/assets/Logo.png';

const statusEtapas = [
  'Pedido em preparação',
  'Pedido pronto',
  'Pedido em rota de entrega',
];

const PedidoStatus = () => {
  const [statusAtual, setStatusAtual] = useState(0);
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const data = {
        numero: 11,
        status: Math.floor(Math.random() * 3), // Simulação de status aleatório
        nome: 'Pizza 25cm',
        descricao:
          'Broto 25cm, MassaTradicional, Borda região, Catupiry da Casa, Batata Crunch, Pepperoni',
        valor: 28.0,
      };

      setPedido(data);
      setStatusAtual(data.status);
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!pedido) return <div className="text-white p-4">Carregando pedido...</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-6">
        <div className="animate-fadeIn">
          <img className="h-16 lg:h-20" src={Logo} alt="Logo" />
        </div>

        <div className="bg-gray-800 p-8 rounded-xl w-full max-w-2xl shadow-lg">
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

          <div className="w-full">
            <h2 className="text-xl font-bold mb-2">Pedido Nº {pedido.numero}</h2>
            <div className="flex justify-between mb-1">
              <p>1x {pedido.nome}</p>
              <p className="font-medium">R$ {pedido.valor.toFixed(2)}</p>
            </div>
            <p className="text-sm text-gray-400">{pedido.descricao}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidoStatus;
