"use client";  // Ensure this is the first line of your component file
import React, { useEffect, useState } from 'react';
import { useCart } from '../../view_cart/components/CartContext';
import styles from '../../customer/styles/styles.module.css';  // Ensure correct styles import
import productStyles from '../styles/productCardStyles.module.css';  // Adjusted for correct import

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isClient, setIsClient] = useState(false);  // State to check if it's client-side

  // Set the client-side flag after the component mounts
  useEffect(() => {
    setIsClient(true); // Mark the component as mounted on the client side
  }, []);

  const handleAddToCart = () => {
    addToCart(product);
    if (isClient) {
      // Client-side navigation without router
      window.location.href = "../../view_cart";  // Navigate using window.location.href
    }
  };

  if (!isClient) {
    return null; // Or you can return a loading spinner or message until the client-side is ready
  }

  return (
    <div className={productStyles.card}>
      <img
        src={product.PROD_IMG}
        alt={product.PROD_NAME}
        className={productStyles.productImage}
      />
      <div className={productStyles.productDetails}>
        <h3 className={productStyles.productName}>{product.PROD_NAME}</h3>
        <p className={productStyles.productDescription}>{product.PROD_DESCRIP}</p>
        <p className={productStyles.productPrice}>${product.PROD_PRICE}</p>
        <button
          className={productStyles.addToCartButton}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
