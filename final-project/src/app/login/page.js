'use client';

import { useState } from 'react';
import { Button, AppBar, Toolbar, Typography, Box, TextField, Container, Paper, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import styles from './login.module.css';  // Importing the CSS Module

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with email:', email, 'and password:', password);
  };

  const handleMenuClick = () => {
    setOpen(!open);
  };

  const handleHomeClick = () => {
    console.log('Home button clicked');
  };

  return (
    <Box className={styles.pageBackground}>  {/* Use styles object here */}
      {/* AppBar (Navbar) */}
      <AppBar position="sticky" className={styles.appBar}>  {/* Use styles object here */}
        <Toolbar className={styles.toolbar}>  {/* Use styles object here */}
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={styles.logo}>  {/* Use styles object here */}
            Crispy Creame
          </Typography>
          <Box className={styles.navLinks}>  {/* Use styles object here */}
            <Link href="/customer" passHref>
              <Button color="inherit" onClick={handleHomeClick}>
                Home
              </Button>
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
        <Paper elevation={3} sx={{ p: 4, backgroundColor: '#FFF8E1' }}>
          <Typography variant="h4" className={styles.formHeader}>  {/* Use styles object here */}
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box className={styles.textField}>  {/* Use styles object here */}
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box className={styles.textField}>  {/* Use styles object here */}
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Button type="submit" className={styles.submitButton}>  {/* Use styles object here */}
              Login
            </Button>
          </form>
          <Box className={styles.registerLink}>  {/* Use styles object here */}
            <Typography variant="body1" className={styles.registerLinkText}>  {/* Use styles object here */}
              Don't have an account?{' '}
              <Link href="/register" passHref>
                <Button variant="text">Register Here</Button>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
