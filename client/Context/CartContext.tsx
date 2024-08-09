"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  count: number;
}

interface CartContextType {
  cart: { items: CartItem[] };
  setCart: React.Dispatch<React.SetStateAction<{ items: CartItem[] }>>;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (index: number) => void;
  updateItemCount: (index: number, count: number) => void;
}

const CART_STORAGE_KEY = "cartItems";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<{ items: CartItem[] }>(() => {
    if (typeof window !== 'undefined') {
      const storedCartItems = localStorage.getItem(CART_STORAGE_KEY);
      return storedCartItems ? { items: JSON.parse(storedCartItems) } : { items: [] };
    }
    return { items: [] };
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.items));
  }, [cart.items]);

  const addItemToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.items.findIndex(i => i._id === item._id);
      if (existingItemIndex > -1) {
        const updatedItems = prevCart.items.map((i, index) =>
          index === existingItemIndex ? { ...i, count: i.count + item.count } : i
        );
        return { items: updatedItems };
      } else {
        return { items: [...prevCart.items, item] };
      }
    });
  };

  const removeItemFromCart = (index: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter((_, i) => i !== index);
      return { items: updatedItems };
    });
  };

  const updateItemCount = (index: number, count: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item, i) =>
        i === index ? { ...item, count } : item
      );
      return { items: updatedItems };
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addItemToCart, removeItemFromCart, updateItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useMycontext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useMycontext must be used within a MyContextProvider');
  }
  return context;
};
