'use client';

// Importing necessary components from MUI
import { useState } from 'react';
import { Button, AppBar, Toolbar, Typography, Box, TextField, Container, Paper, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';  // Menu icon for the burger button
import Link from 'next/link';  // Link component to navigate between pages

// Custom theme for the login page
const theme = {
  palette: {
    primary: {
      main: '#FFB6C1', // Light pink color for buttons and navbar
    },
    secondary: {
      main: '#FFF8E1', // Light cream color for the page background
    },
    text: {
      primary: '#000000', // Black text for the form labels
      secondary: '#333333', // Darker color for page content text
    },
  },
};

// Functional component for the Login Page
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false); // State for burger menu open/close
  const [homeText, setHomeText] = useState('Home'); // State for the "Home" button text

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here (e.g., API call)
    console.log('Login attempted with email:', email, 'and password:', password);
  };

  // Function to toggle the burger menu
  const handleMenuClick = () => {
    setOpen(!open); // Toggle menu open/close
  };

  // Function to handle "Home" button click
  const handleHomeClick = () => {
    // Any additional logic can go here
    console.log('Home button clicked');
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

          {/* Logo */}
          <Typography variant="h6" sx={{ flexGrow: 1, color: theme.palette.text.primary }}>
            Crispy Creame
          </Typography>

          {/* Links */}
          <Box sx={{ display: 'flex' }}>
            <Link href="/customer" passHref>
              <Button color="inherit" onClick={handleHomeClick}>
                {homeText} {/* Dynamically change the button text */}
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

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: '#FFF8E1' }}>
          <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.primary }}>
            Login
          </Typography>
          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ backgroundColor: '#ffffff' }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ backgroundColor: '#ffffff' }}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: theme.palette.primary.main }}
            >
              Login
            </Button>
          </form>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
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
