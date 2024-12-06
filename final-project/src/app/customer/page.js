"use client"; // Mark the component as a client component

import React, { useEffect, useState } from "react";
import Navbar from "../TEMPLATES/NAVBAR/Navbar";
import ProductCard from "./components/ProductCard";
import styles from "./styles/styles.module.css";
import { CartProvider } from "../customer/components/CartContext";

export default function CustomerPage() {
  const [products, setProducts] = useState([]);
  const [weather, setWeatherData] = useState(null);

  // Fetch weather data
  useEffect(() => {
    fetch("../api/getWeatherApi")
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((err) => console.error("Error fetching weather data:", err));
  }, []);

  // Fetch product data
  useEffect(() => {
    fetch("../api/getProducts")
      .then((res) => res.json())
      .then((data) => {
        const uniqueProducts = Array.from(
          new Set(data.map((product) => product._id)) // Extract unique _id values
        ).map((id) => data.find((product) => product._id === id));
        setProducts(uniqueProducts); // Set unique products
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <CartProvider>
      <div className={styles.pageContainer}>
        <Navbar />

        <div className={styles.mainContent}>
          {/* Display Product Section */}
          <div className={styles.productPage}>
            {products.length > 0 && (
              <div className={styles.productGrid}>
                {/* Render only the first product */}
                <ProductCard key={products[0]._id} product={products[0]} />
              </div>
            )}
          </div>

          {/* Weather Section */}
          <div className={styles.weatherBox}>
            <h3>Weather</h3>
            {weather ? (
              <div>
                <p>Temp: {weather.temp}°C</p>
                {weather.icon && <img src={weather.icon} alt="Weather Icon" />}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </CartProvider>
  );
}
