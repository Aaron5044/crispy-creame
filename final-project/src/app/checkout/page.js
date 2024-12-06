'use client';
import { useState, useEffect } from "react";
import { getCart, clearCart } from "../cart/utils/storage";
import { Typography, Grid, Button, TextField } from "@mui/material";
import Navbar from '../TEMPLATES/NAVBAR/Navbar';
import styles from '../checkout/styles/checkout.module.css';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [cart, setCartState] = useState([]);
  const [email, setEmail] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [cardnumber, setCardnumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiration, setExpiration] = useState('');
  const router = useRouter();

  useEffect(() => {
    const savedCart = getCart();
    setCartState(savedCart || []);
  }, []);

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
      cardnumber,
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
        clearCart();
        setCartState([]); // Clear the cart in state after checkout
        router.push("/checkoutcomplete"); // Redirect to checkout complete page
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
      <Grid container spacing={4} sx={{ marginTop: 3 }}>
        {/* Checkout Form Section */}
        <Grid item xs={12} sm={6}>
          <div className={styles.checkoutForm}>
            <form onSubmit={handleCheckout}>
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
                id="cardnumber"
                label="Cardholder Number"
                value={cardnumber}
                onChange={(e) => setCardnumber(e.target.value)}
                required
                variant="outlined"
                fullWidth
                sx={{ marginBottom: '1rem', backgroundColor: '#f0f0f0' }}
              />
              <TextField
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
