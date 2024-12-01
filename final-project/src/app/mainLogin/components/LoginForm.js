'use client';

import React, { useState } from 'react';
import styles from '../style/loginForm.module.css';  // Import the CSS module

export default function LoginForm({ onResponseMessage, onRedirect }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData); // Log form data to check

    try {
      const response = await fetch('http://localhost:5000/api/setLogin', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        // Session has been set on the server, now store in localStorage for client side
        localStorage.setItem('sessionUser', formData.email);  // Storing email to localStorage
        onRedirect("../customer");
      } else {
        onResponseMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      onResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="email" className={styles.label}>
        Email:
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        required
        className={styles.input}
      />

      <label htmlFor="password" className={styles.label}>
        Password:
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        required
        className={styles.input}
      />

      <button type="submit" className={styles.button}>
        Login
      </button>

      {/* Register Link */}
      <div className={styles.registerLink}>
        <a href="/mainRegister" className={styles.link}>Don't have an account? Register here</a>
      </div>
    </form>
  );
}
