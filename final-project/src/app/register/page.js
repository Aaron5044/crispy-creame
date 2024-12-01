'use client';

// Import necessary components and CSS module
import { useState } from 'react';
import { Button, AppBar, Toolbar, Typography, Box, TextField, Container, Paper, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import styles from './register.module.css';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration details:', { name, email, password, address, phone, postalCode });
  };

  const handleMenuClick = () => {
    setOpen(!open);
  };

  return (
    <Box className={styles.pageBackground}>
      <AppBar position="sticky" className={styles.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={styles.logo}>
            Crispy Creame
          </Typography>
          <Box className={styles.navLinks}>
            <Link href="/customer" passHref>
              <Button color="inherit">Home</Button>
            </Link>
            <Link href="/login" passHref>
              <Button color="inherit">Login</Button>
            </Link>
            <Link href="/view-cart" passHref>
              <Button color="inherit">View Cart</Button>
            </Link>
            <Link href="/checkout" passHref>
              <Button color="inherit">Checkout</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} className={styles.formContainer}>
          <Typography variant="h4" className={styles.heading}>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.textField}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.textField}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.textField}
            />
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.textField}
            />
            <TextField
              fullWidth
              label="Phone Number"
              type="tel"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.textField}
            />
            <TextField
              fullWidth
              label="Postal Code"
              variant="outlined"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className={styles.textField}
            />
            <Button type="submit" fullWidth variant="contained" className={styles.submitButton}>
              Register
            </Button>
          </form>
          <Typography variant="body1" className={styles.loginText}>
            Already have an account?{' '}
            <Link href="/login" passHref>
              <Button variant="text">Login Here</Button>
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
