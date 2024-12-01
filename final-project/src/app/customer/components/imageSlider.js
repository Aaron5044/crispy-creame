"use client";

import { useState } from "react";
import styles from "../styles/ImageSlider.module.css";


export default function ImageSlider() {
  const images = [
    "https://clevelandtraveler.com/wp-content/uploads/2021/01/Brewnuts-1024x767.jpg", // Replace with actual image paths
    "https://res.cloudinary.com/hz3gmuqw6/image/upload/c_fill,h_450,q_auto,w_710/f_auto/best-donuts-in-each-state-phpU93bY8",
    "https://images.squarespace-cdn.com/content/v1/5a563c1cd55b41fd7759755f/1671904710126-A9EX9GGZOA1B8PL1EP6B/Dozen+Classics.JPG?format=1000w",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className={styles.slider}>
      <div className={styles.imageContainer}>
        <img src={images[currentIndex]} alt="IMG NOT FOUND" className={styles.image} />
      </div>
      <div className={styles.controls}>
        <button onClick={prevSlide} className={styles.prevButton}>{"<"}</button>
        <button onClick={nextSlide} className={styles.nextButton}>{">"}</button>
      </div>
    </div>
  );
}
