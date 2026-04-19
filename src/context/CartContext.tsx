import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  weight: string;
  cutType: string;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, cutType: string, weight: string) => void;
  updateQuantity: (id: string, cutType: string, weight: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('k2k_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('k2k_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.id === newItem.id && 
        item.cutType === newItem.cutType && 
        item.weight === newItem.weight
      );
      if (existing) {
        return prev.map(item => 
          (item.id === newItem.id && item.cutType === newItem.cutType && item.weight === newItem.weight)
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string, cutType: string, weight: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.cutType === cutType && item.weight === weight)));
  };

  const updateQuantity = (id: string, cutType: string, weight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, cutType, weight);
      return;
    }
    setCart(prev => prev.map(item => 
      (item.id === id && item.cutType === cutType && item.weight === weight)
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
