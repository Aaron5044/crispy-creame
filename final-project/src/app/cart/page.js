'use client';
import { useState, useEffect } from "react";
import { getCart, addToCart, clearCart } from "../cart/utils/storage";
import { IconButton, Typography, Grid, Button, TextField, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from '../TEMPLATES/NAVBAR/Navbar';
import styles from './style/cartPage.module.css'; 
import { useRouter } from 'next/navigation'; 

// CartPage component to manage and display the shopping cart

export default function CartPage() {
  const [cart, setCartState] = useState([]);
  const [showEmptyCartMessage, setShowEmptyCartMessage] = useState(false); // New state for empty cart message
  const router = useRouter(); // UseRouter provides a way to programmatically navigate (redirect) between pages in your application.

  // useEffect hook to fetch cart data from localStorage on initial load
  useEffect(() => {
    const savedCart = getCart();
    setCartState(savedCart || []);
  }, []);

  // Handle removing an item from the cart
  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index); // Filter out the item by index
    setCartState(updatedCart);
    if (updatedCart.length === 0) {
      clearCart();
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update the cart in localStorage
    }
  };


  // Handle changing the quantity of a product in the cart
  const handleQuantityChange = (index, value) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, value);
    setCartState(updatedCart);
    addToCart(updatedCart); // Use addToCart to update the cart in localStorage
  };

  // Calculate the subtotal of the cart items
  const subtotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.PROD_PRICE || 0);
    const quantity = parseInt(item.quantity || 1, 10);
    return acc + price * quantity;
  }, 0);

  const shippingFee = cart.length > 0 ? 5.99 : 0;
  const total = subtotal + shippingFee;

  // Function to redirect to the checkout page or show empty cart message
  const goToCheckout = () => {
    if (cart.length > 0) {
      router.push("/checkout"); // Redirect to checkout page
    } else {
      setShowEmptyCartMessage(true); // Show empty cart message
    }
  };

// This is the CartPage component, which is responsible for managing and displaying the user's shopping cart.
// It handles displaying cart items, allowing the user to adjust quantities, remove items, and proceed to checkout.
// The component uses localStorage to persist cart data between page reloads.

  return (
    <div className={styles.cartContainer}>
      <Navbar />
      <Typography variant="h4" gutterBottom className={styles.cartTitle}>SHOPPING CART</Typography>
      <Grid container spacing={4} sx={{ marginTop: 3 }}>
        {/* Product Info Section */}
        <Grid item xs={12}>
          <div className={styles.productInfoForm}>
            <Typography variant="h6"></Typography>
            {cart.length > 0 ? (
              <ul className={styles.productInfoList}>
                {cart.map((item, index) => (
                  <li key={index} className={styles.productInfoItem}>
                    <div className={styles.productImage}>
                      <img
                        src={item.PROD_IMG}
                        alt={item.PROD_NAME}
                      />
                    </div>
                    <div className={styles.productDetails}>
                      <Typography variant="body1">
                        <strong>{item.PROD_NAME}</strong>
                      </Typography>
                      <Typography variant="body2">
                        ${parseFloat(item.PROD_PRICE || 0).toFixed(2)}
                      </Typography>
                    </div>
                    <div className={styles.removeBtn}>
                      <TextField
                        type="number"
                        value={item.quantity || 1}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                        inputProps={{ min: 1 }}
                        variant="outlined"
                        size="small"
                        sx={{ width: '70px', backgroundColor: '#f0f0f0' }}
                      />
                      <IconButton onClick={() => handleRemoveItem(index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body1">YOUR CART IS EMPTY.</Typography>
            )}
          </div>
        </Grid>
      </Grid>

      {/* Button to go to Checkout */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={goToCheckout}
        className={styles.finalCheckoutBtn}
      >
        GO TO CHECKOUT
      </Button>

      {/* Snackbar for empty cart message */}
      <Snackbar
        open={showEmptyCartMessage}
        autoHideDuration={3000}
        onClose={() => setShowEmptyCartMessage(false)}
        message="Cart is empty. Add items to proceed."
      />
    </div>
  );
}
