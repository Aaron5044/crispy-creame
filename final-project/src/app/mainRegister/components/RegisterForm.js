'use client'; // Indicates that this component is rendered on the client-side

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material'; // Import Material UI components
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    role: '',
    email: '',
    pass: '',
  });

  const [responseMessage, setResponseMessage] = useState(''); // State for response messages
  const [isSuccessful, setIsSuccessful] = useState(false); // Track success for redirection
  const router = useRouter(); // Initialize router for redirection

  // Update state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams({
        username: formData.username,
        role: formData.role,
        email: formData.email,
        password: formData.pass,
      });

      const response = await fetch(`/api/setRegister?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setResponseMessage('Registration successful!');
        setIsSuccessful(true); // Mark registration as successful
        setTimeout(() => {
          router.push('/loginExample'); // Redirect to login page after 2 seconds
        }, 2000);
      } else {
        setResponseMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '90px auto',
        padding: 3,
        borderRadius: 2,
        bgcolor: 'black',
        boxShadow: 3,
        border: '2px solid white',
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        textAlign="center"
        fontWeight="bold"
        color="yellow"
        mb={2}
      >
        SIGN UP
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <TextField
          label="First Name"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'darkpink' },
            },
          }}
        />

        {/* Role Field */}
        <TextField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'darkpink' },
            },
          }}
        />

        {/* Email Field */}
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'darkpink' },
            },
          }}
        />

        {/* Password Field */}
        <TextField
          label="Password"
          name="pass"
          type="password"
          value={formData.pass}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'darkpink' },
            },
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: 'yellow',
            color: 'black',
            border: '2px solid white',
            '&:hover': {
              bgcolor: 'olivedrab',
            },
          }}
        >
          REGISTER
        </Button>
      </form>

      {/* Response Message */}
      {responseMessage && (
        <Alert
          severity={responseMessage.startsWith('Error') ? 'error' : 'success'}
          sx={{ mt: 3 }}
        >
          {responseMessage}
        </Alert>
      )}
    </Box>
  );
}
