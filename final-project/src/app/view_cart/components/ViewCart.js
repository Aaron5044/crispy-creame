'use client';

import React from 'react';
import { useCart } from '../components/CartContext';
import styles from '../styles/cartStyles.module.css';


const ViewCart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (e, productName) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      updateQuantity(productName, newQuantity);
    }
  };

  const handleRemove = (productName) => {
    removeFromCart(productName);
  };

  return (
    <div className={styles.viewCart}>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <ul className={styles.cartList}>
          {cartItems.map((item, index) => (
            <li key={index} className={styles.cartItem}>
              <img src={item.PROD_IMG} alt={item.PROD_NAME} className={styles.cartImage} />
              <div className={styles.cartDetails}>
                <h3>{item.PROD_NAME}</h3>
                <p>{item.PROD_DESCRIP}</p>
                <p>${item.PROD_PRICE}</p>
                <div className={styles.quantityControl}>
                  <button onClick={() => updateQuantity(item.PROD_NAME, item.quantity - 1)}>-</button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(e, item.PROD_NAME)}
                  />
                  <button onClick={() => updateQuantity(item.PROD_NAME, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => handleRemove(item.PROD_NAME)} className={styles.removeButton}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <button className={styles.checkoutButton}>Proceed to Checkout</button>
    </div>
  );
};

export default ViewCart;
