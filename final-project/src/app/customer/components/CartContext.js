"use client";  // Mark the component as a client component

import React, { createContext, useContext, useState } from "react";

// Create CartContext
const CartContext = createContext();

// Custom hook to access the cart context
export const useCart = () => useContext(CartContext);

// CartProvider component to manage the cart state
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingProduct = prev.find(
        (item) => item.PROD_NAME === product.PROD_NAME
      );
      if (existingProduct) {
        return prev.map((item) =>
          item.PROD_NAME === product.PROD_NAME
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productName) => {
    setCartItems((prev) => prev.filter((item) => item.PROD_NAME !== productName));
  };

  const updateQuantity = (productName, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.PROD_NAME === productName ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
