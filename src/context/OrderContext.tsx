// src/context/OrderContext.tsx
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/product';

type OrderContextType = {
  order: Product[];
  addToOrder: (product: Product) => void;
  removeFromOrder: (id: string) => void;
  clearOrder: () => void;
  total: number;
};

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<Product[]>([]);

  const addToOrder = (product: Product) => {
    setOrder(prev => [...prev, product]);
  };

  const removeFromOrder = (id: string) => {
    setOrder(prev => prev.filter(p => p.id !== id));
  };

  const clearOrder = () => setOrder([]);

  const total = order.reduce((sum, p) => sum + p.price, 0);

  return (
    <OrderContext.Provider value={{ order, addToOrder, removeFromOrder, clearOrder, total }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder debe usarse dentro de un OrderProvider');
  return context;
}
