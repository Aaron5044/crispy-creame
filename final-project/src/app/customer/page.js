'use client';

// Importing necessary components from MUI
import { useState } from 'react';
import { Button, AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';  // Menu icon for the burger button
import Link from 'next/link';  // Link component to navigate between pages

// Custom theme for the navbar and background colors
const theme = {
  palette: {
    primary: {
      main: '#FFB6C1', // Light pink color for the background of the navbar
    },
    secondary: {
      main: '#FFF8E1', // Light cream color for the page background
    },
    text: {
      primary: '#000000', // Black text for the navbar items
      secondary: '#333333', // Darker color for page content text
    },
  },
};

// Functional component for the Navbar
export default function Navbar() {
  const [open, setOpen] = useState(false); // State to handle the burger menu open/close

  // Function to toggle the burger menu when the icon is clicked
  const handleMenuClick = () => {
    setOpen(!open); // Toggle the value of open
  };

  return (
    // Outer Box for the full page background
    <Box sx={{ backgroundColor: theme.palette.secondary.main, minHeight: '100vh' }}>
      {/* AppBar (Navbar) */}
      <AppBar position="sticky" sx={{ backgroundColor: theme.palette.primary.main }}>
        {/* Toolbar is the container for the navbar elements */}
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
          {/* Burger menu icon */}
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon /> {/* This is the hamburger icon */}
          </IconButton>

          {/* KrispyKreme Logo - This can be an image, but for now, it's just text */}
          <Typography variant="h6" sx={{ flexGrow: 1, color: theme.palette.text.primary }}>
            Crispy Creame {/* Logo name */}
          </Typography>

          {/* Box for navbar links */}
          <Box sx={{ display: 'flex' }}>
            {/* Link to the customer page */}
            <Link href="/customer" passHref>
              <Button color="inherit">
                Home {/* Keep this text as "Home" */}
              </Button>
            </Link>

            {/* Link to the login page */}
            <Link href="/login" passHref>
              <Button color="inherit">Login</Button>
            </Link>

            {/* Link to the view cart page */}
            <Link href="/view-cart" passHref>
              <Button color="inherit">View Cart</Button>
            </Link>

            {/* Link to the checkout page */}
            <Link href="/checkout" passHref>
              <Button color="inherit">Checkout</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* The rest of the page content goes here */}
      <Box sx={{ padding: 3, color: theme.palette.text.secondary }}>
        {/* Add your other content here */}
        <Typography variant="h4">
          Welcome to Crispy Creame!
        </Typography>
        {/* More content can be added here */}
      </Box>
    </Box>
  );
}
