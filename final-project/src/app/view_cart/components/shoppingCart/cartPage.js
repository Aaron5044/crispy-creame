"use client"; // Mark this file as a client component

import { useState } from "react";  // Now hooks like useState will work
import { useCart } from "../../components/CartContext"; // Ensure correct import path
import styles from "../../styles/cart.module.css";  // Ensure the correct path to styles

const CartPage = () => {
  const { cart = [], removeFromCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);

  // Calculate totals
  const calculateTotal = () => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 5.99; // Fixed shipping cost
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  };

  const { subtotal, shipping, total } = calculateTotal();

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity <= 0) return; // Prevent negative quantities
    updateQuantity(itemId, quantity);
  };

  // Handle form input for updating quantity
  const handleInputChange = (itemId, value) => {
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue) && parsedValue > 0) {  // Ensure a valid number is entered
      handleUpdateQuantity(itemId, parsedValue);
    }
  };

  return (
    <div className={styles.cartPage}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className={styles.cartContainer}>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.cartItemImage}
                />
                <div className={styles.cartItemDetails}>
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                      min="1"
                    />
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cartSummary}>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Shipping: ${shipping.toFixed(2)}</p>
            <p>Total: ${total.toFixed(2)}</p>
            <button className={styles.checkoutButton}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
