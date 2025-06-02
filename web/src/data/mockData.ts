import { Order } from '../types';

export const mockCurrentOrder: Order = {
  id: '1234567890',
  orderNumber: 11,
  status: 'preparing',
  orderDate: '13 de abril de 2025, 18:28',
  items: [
    {
      id: 'item1',
      name: 'Pizza 25cm',
      description: 'Broto 25cm, MassaTradicional, Borda regão, Catupiry da Casa, Batata Crunch, Pepperoni',
      quantity: 1,
      price: 28.00
    }
  ],
  subtotal: 28.00,
  deliveryFee: 5.00,
  total: 33.00,
  deliveryAddress: 'Av. Paulista, 1000, Apto 123, São Paulo - SP',
  estimatedDeliveryTime: '19:10',
  steps: [
    {
      id: 'confirmed',
      label: 'Pedido confirmado',
      time: '13 de abril de 2025, 18:20',
      status: 'completed',
      details: 'Your order has been received'
    },
    {
      id: 'preparing',
      label: 'Pedido em preparação',
      time: '13 de abril de 2025, 18:28',
      status: 'current',
      details: 'Restaurant is preparing your food'
    },
    {
      id: 'ready',
      label: 'Pedido pronto',
      status: 'pending',
      details: 'Pendente'
    },
    {
      id: 'delivery',
      label: 'Pedido em rota de entrega',
      status: 'pending',
      details: 'Pendente'
    }
  ]
};

export const mockOrderHistory: Order[] = [
  {
    id: 'hist1',
    orderNumber: 10,
    status: 'delivered',
    orderDate: '10 de abril de 2025, 20:15',
    items: [
      {
        id: 'histitem1',
        name: 'Pizza Grande',
        description: 'Pizza grande de calabresa com borda de catupiry',
        quantity: 1,
        price: 45.00
      },
      {
        id: 'histitem2',
        name: 'Refrigerante',
        description: 'Coca-Cola 2L',
        quantity: 1,
        price: 12.00
      }
    ],
    subtotal: 57.00,
    deliveryFee: 7.00,
    total: 64.00,
    deliveryAddress: 'Av. Paulista, 1000, Apto 123, São Paulo - SP',
    steps: []
  },
  {
    id: 'hist2',
    orderNumber: 9,
    status: 'delivered',
    orderDate: '5 de abril de 2025, 19:45',
    items: [
      {
        id: 'histitem3',
        name: 'Combo Hambúrguer',
        description: 'Hambúrguer artesanal, batatas fritas e refrigerante',
        quantity: 2,
        price: 35.00
      }
    ],
    subtotal: 70.00,
    deliveryFee: 7.00,
    total: 77.00,
    deliveryAddress: 'Av. Paulista, 1000, Apto 123, São Paulo - SP',
    steps: []
  },
  {
    id: 'hist3',
    orderNumber: 8,
    status: 'cancelled',
    orderDate: '1 de abril de 2025, 21:30',
    items: [
      {
        id: 'histitem4',
        name: 'Pizza Média',
        description: 'Pizza média de frango com catupiry',
        quantity: 1,
        price: 38.00
      }
    ],
    subtotal: 38.00,
    deliveryFee: 7.00,
    total: 45.00,
    deliveryAddress: 'Av. Paulista, 1000, Apto 123, São Paulo - SP',
    steps: []
  }
];