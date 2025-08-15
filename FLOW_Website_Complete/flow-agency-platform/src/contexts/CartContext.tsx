import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Report, CartItem } from '../types/report';

interface CartContextType {
  items: CartItem[];
  addToCart: (report: Report) => void;
  removeFromCart: (reportId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'flow_cart_items';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Загружаем корзину из localStorage при инициализации
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const addToCart = (report: Report) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.report.id === report.id);
      if (existingItem) {
        return prev.map(item => 
          item.report.id === report.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { report, quantity: 1 }];
    });
  };

  const removeFromCart = (reportId: string) => {
    setItems(prev => prev.filter(item => item.report.id !== reportId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.report.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      getTotalPrice,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};