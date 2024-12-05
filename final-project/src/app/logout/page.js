'use client'; // Make sure this is client-side

import { useRouter } from 'next/navigation';
import { Button, Container, Typography } from '@mui/material';
import NAVBAR from '../TEMPLATES/NAVBAR/Navbar'; // Import Navbar

const LogoutPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('user');
    
    // Redirect to login page
    router.push('/loginExample'); // Adjust to your login path
  };

  return (
    <>
      {/* Navbar component */}
      <NAVBAR />

      <Container maxWidth="xs" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          You have been logged out successfully.
        </Typography>
        <Button variant="contained" onClick={handleLogout}>
          Go to Login
        </Button>
      </Container>
    </>
  );
};

export default LogoutPage;
