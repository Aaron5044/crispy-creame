"use client";

import React, { useEffect, useState } from "react";
import { addToCart } from "../../cart/utils/storage"; // Import addToCart function
import { useRouter } from "next/navigation";
import productStyles from "../styles/productCardStyles.module.css";

// Define ProductCard OUTSIDE the main ProductPage component
const ProductCard = ({ product, onAddToCart }) => (
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
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  </div>
);

const ProductPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  // Fetch products from API with duplicate filtering
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("../api/getProducts");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();

        // Filter out duplicates based on unique _id
        const uniqueProducts = [];
        const seenIds = new Set();

        data.forEach((product) => {
          if (!seenIds.has(product._id)) {
            seenIds.add(product._id);
            uniqueProducts.push(product);
          }
        });

        setProducts(uniqueProducts); // Set all unique products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // Use addToCart from storage
    alert(`${product.PROD_NAME} added to cart!`);
  };

  const goToCart = () => {
    router.push("../cart");
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f5f5f5", color: "#333" }}>
      <h1>Products</h1>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {products.map((product) => (
            <ProductCard
              key={product._id} // Use unique _id as the key
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
      <button
        onClick={goToCart}
        style={{
          marginTop: "2rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Go to Cart
      </button>
    </div>
  );
};

export default ProductPage;
