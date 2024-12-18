"use client";

import React, { useEffect, useState } from "react";
import { addToCart } from "../../cart/utils/storage"; // Import addToCart function
import { useRouter } from "next/navigation";
import productStyles from "../styles/productCardStyles.module.css";

// This component represents a card that displays individual product details and allows the user to add the product to their cart.
// It receives product data and an `onAddToCart` function as props.
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
        ADD TO CART
      </button>
    </div>
  </div>
);

const ProductPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  // Fetch products from the API and filter out duplicates based on the product's unique _id.
  // This effect runs only once when the component mounts.
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

// Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    addToCart(product); // Use addToCart from storage
    alert(`${product.PROD_NAME} added to cart!`);
  };

  const goToCart = () => {
    router.push("../cart");
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "black",}}>
      {/* Display loading message if products haven't been loaded yet */}
      {products.length === 0 ? (
        <p>Loading products</p>
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
    </div>
  );
};

export default ProductPage;
