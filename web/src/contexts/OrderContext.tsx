import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Order } from '../types';
import { mockCurrentOrder, mockOrderHistory } from '../data/mockData';

interface OrderContextType {
  currentOrder: Order | null;
  orderHistory: Order[];
  refreshOrderStatus: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(mockCurrentOrder);
  const [orderHistory, setOrderHistory] = useState<Order[]>(mockOrderHistory);

  const refreshOrderStatus = () => {
    // In a real app, this would fetch the latest order status from an API
    console.log('Refreshing order status...');
    
    // For demo purposes, we'll just update the mock data
    if (currentOrder) {
      const updatedOrder = { ...currentOrder };
      
      // Find the current step and move it forward if not at the end
      const currentStepIndex = updatedOrder.steps.findIndex(
        step => step.status === 'current'
      );
      
      if (currentStepIndex < updatedOrder.steps.length - 1) {
        // Update current step to completed
        updatedOrder.steps[currentStepIndex].status = 'completed';
        
        // Update next step to current
        updatedOrder.steps[currentStepIndex + 1].status = 'current';
        updatedOrder.steps[currentStepIndex + 1].time = new Date().toLocaleString('pt-BR');
        
        // Update order status
        updatedOrder.status = updatedOrder.steps[currentStepIndex + 1].id;
        
        setCurrentOrder(updatedOrder);
      }
    }
  };

  return (
    <OrderContext.Provider value={{ currentOrder, orderHistory, refreshOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  
  return context;
};