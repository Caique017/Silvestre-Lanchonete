export interface OrderItem {
    id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
  }
  
  export interface TimelineStep {
    id: string;
    label: string;
    time?: string;
    status: 'completed' | 'current' | 'pending';
    details?: string;
  }
  
  export interface Order {
    id: string;
    orderNumber: number;
    status: string;
    orderDate: string;
    items: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    deliveryAddress: string;
    estimatedDeliveryTime?: string;
    steps: TimelineStep[];
  }