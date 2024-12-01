'use client';

import { useState } from 'react';
import { Button, AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import styles from './customer.module.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {
    setOpen(!open);
  };

  return (
    <Box className={styles.pageBackground}>
      {/* AppBar (Navbar) */}
      <AppBar position="sticky" className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
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

      <Box className={styles.pageContent}>
        <Typography variant="h4">Welcome to Crispy Creame!</Typography>
      </Box>
    </Box>
  );
}
