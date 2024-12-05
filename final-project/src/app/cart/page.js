'use client';
import { useState, useEffect } from "react";
import { getCart, addToCart, clearCart } from "../cart/utils/storage";
import { IconButton, Typography, Grid, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from '../TEMPLATES/NAVBAR/Navbar';
import styles from './style/cartPage.module.css';

export default function CartPage() {
  const [cart, setCartState] = useState([]);
  const [email, setEmail] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiration, setExpiration] = useState('');

  useEffect(() => {
    const savedCart = getCart();
    setCartState(savedCart || []);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCartState(updatedCart);
    if (updatedCart.length === 0) {
      clearCart();
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleQuantityChange = (index, value) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, value);
    setCartState(updatedCart);
    addToCart(updatedCart); // Use addToCart to update the cart in localStorage
  };

  const subtotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.PROD_PRICE || 0);
    const quantity = parseInt(item.quantity || 1, 10);
    return acc + price * quantity;
  }, 0);

  const shippingFee = cart.length > 0 ? 5.99 : 0;
  const total = subtotal + shippingFee;

  const handleCheckout = async (e) => {
    e.preventDefault();

    const orderDetails = {
      email,
      cardholder,
      cvv,
      expiration,
      items: cart.map(item => ({
        PROD_NAME: item.PROD_NAME,
        PROD_PRICE: item.PROD_PRICE,
        quantity: item.quantity,
      })),
      subtotal,
      shippingFee,
      total,
    };

    try {
      const response = await fetch('../api/setOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        alert("Checkout complete!");
        clearCart();
        setCartState([]); // Clear the cart in state after checkout
      } else {
        alert("Something went wrong with the checkout.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout.");
    }
  };

  return (
    <div className={styles.cartContainer}>
      <Navbar />
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', paddingTop: 4 }}>Shopping Cart</Typography>
      <Grid container spacing={4} sx={{ marginTop: 3 }}>
        {/* Product Info Section */}
        <Grid item xs={12} sm={6}>
          <div
            className={styles.productInfoForm}
            style={{
              maxHeight: '500px',
              minHeight: '500px',
              overflowY: 'scroll',
              overflowX: 'hidden',
              border: '1px solid #ccc',
              padding: '1rem',
            }}
          >
            <Typography variant="h6">Product Info</Typography>
            {cart.length > 0 ? (
              <ul className={styles.productInfoList}>
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className={styles.productInfoItem}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img
                        src={item.PROD_IMG}
                        alt={item.PROD_NAME}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                        }}
                      />
                      <div>
                        <Typography variant="body1">
                          <strong>{item.PROD_NAME}</strong>
                        </Typography>
                        <Typography variant="body2">
                          ${parseFloat(item.PROD_PRICE || 0).toFixed(2)}
                        </Typography>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <TextField
                        type="number"
                        value={item.quantity || 1}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                        inputProps={{ min: 1 }}
                        variant="outlined"
                        size="small"
                        sx={{
                          width: '70px',
                          backgroundColor: '#f0f0f0',
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#ccc',
                            },
                          },
                        }}
                      />
                      <IconButton onClick={() => handleRemoveItem(index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body1">Your cart is empty.</Typography>
            )}
          </div>
        </Grid>

        {/* Checkout Section */}
        <Grid item xs={12} sm={6}>
          <div className={styles.checkoutForm} style={{ height: '500px', padding: '1rem', border: '1px solid #ccc' }}>
            <Typography variant="h6">Checkout</Typography>
            <form onSubmit={handleCheckout}>
              <div className={styles.formGroup}>
                <TextField
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: '1rem', backgroundColor: '#f0f0f0' }}
                />
                <TextField
                  id="cardholder"
                  label="Cardholder Name"
                  value={cardholder}
                  onChange={(e) => setCardholder(e.target.value)}
                  required
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: '1rem', backgroundColor: '#f0f0f0' }}
                />
                <TextField
                  type="text"
                  id="cvv"
                  label="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: '1rem', backgroundColor: '#f0f0f0' }}
                />
                <TextField
                  type="text"
                  id="expiration"
                  label="Expiration"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                  placeholder="MM/YY"
                  required
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: '1rem', backgroundColor: '#f0f0f0' }}
                />
              </div>
              <Typography variant="body2">Subtotal: ${subtotal.toFixed(2)}</Typography>
              <Typography variant="body2">Shipping: ${shippingFee.toFixed(2)}</Typography>
              <Typography variant="body1"><strong>Total: ${total.toFixed(2)}</strong></Typography>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: '1rem' }}
              >
                Complete Checkout
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
