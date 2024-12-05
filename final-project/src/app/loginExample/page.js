'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Container,
  CssBaseline,
  Link as MuiLink,
} from '@mui/material';

import NAVBAR from '../TEMPLATES/NAVBAR/Navbar'; // Import Navbar
import Link from 'next/link'; // Import Link for navigation

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false); // State to track login success
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoginSuccess(false); // Reset login success state before attempt

    try {
      const response = await fetch('../loginExample/api/apiLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError('An error occurred. Please try again.');
        return;
      }

      const data = await response.json();
      console.log(data); // Log the response to check the structure

      if (data.data === 'valid') {
        setLoginSuccess(true); // Set login success to true

        // Store session data in sessionStorage
        sessionStorage.setItem(
          'user',
          JSON.stringify({ email, role: data.role })
        );
        const userRole = data.role.toLowerCase();

        // Redirect based on role
        if (userRole === 'customer') {
          router.push('/customer'); // Redirect to customer page
        } else if (userRole === 'manager') {
          router.push('/manager'); // Redirect to manager page
        }
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      {/* Navbar component */}
      <NAVBAR />

      {/* Main page with a gradient background */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(to right, black 50%, #8B1A4B 50%)', // Half black, half dark pink
        }}
      >
        {/* Login form container */}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              backgroundColor: 'grey',
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: '#767B91',
              border: '2px solid white',
              color: 'white',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
              Login
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
              {/* Email input */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{border: '2px solid white',color: 'white'}}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password input */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                sx={{border: '2px solid white', color:'white'}}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Error alert */}
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Success message */}
              {loginSuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Login Complete! Session Started.
                </Alert>
              )}

              {/* Login button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, color:'white', backgroundColor:'#767B91', border: '2px solid white',             '&:hover': {
                  bgcolor: '#F7C59F',
                  color: 'darkpink',
                }, }}
              >
                Login
              </Button>

              {/* Register Button */}
              <Box textAlign="center" mt={2}>
              <Link href="/mainRegister" passHref>
                <Typography
                  component="a"
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': {
                      backgroundColor: 'black',
                      color: 'white',
                      padding: '0.2rem',
                      borderRadius: '5px',
                    },
                  }}
                >
                  DON'T HAVE AN A/C JUST - REGISTER!!!
                </Typography>
              </Link>
            </Box>

            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
