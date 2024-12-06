'use client';

import { Box, Button, TextField, Typography, Alert, Container, CssBaseline } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NAVBAR from '../TEMPLATES/NAVBAR/Navbar'; // Import Navbar
import useLogin from './functions/funtion'; // Import the custom hook
import LOGIN from './style/LoginPage.module.css'; // Import the CSS file

const LoginPage = () => {
  const router = useRouter();
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loginSuccess,
    handleLogin,
  } = useLogin(router); // Use the custom hook

  return (
    <>
      {/* Navbar component */}
      <NAVBAR />

      {/* Main page with a gradient background */}
      <Box className={LOGIN.loginContainer}>
        {/* Login form container */}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box className={LOGIN.loginForm}>
            <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
              LOGIN
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
                className={LOGIN.inputField}
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
                className={LOGIN.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Error alert */}
              {error && (
                <Alert severity="error" className={LOGIN.alert}>
                  {error}
                </Alert>
              )}

              {/* Success message */}
              {loginSuccess && (
                <Alert severity="success" className={LOGIN.alert}>
                  Login Complete! Session Started.
                </Alert>
              )}

              {/* Login button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={LOGIN.loginButton}
              >
                LOGIN
              </Button>

              {/* Register Button */}
              <Box textAlign="center" mt={2}>
                <Link href="/mainRegister" passHref>
                  <Typography component="a" className={LOGIN.registerLink}>
                    REGISTER HERE
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
