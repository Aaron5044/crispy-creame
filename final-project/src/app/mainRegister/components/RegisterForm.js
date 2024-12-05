'use client'; // Indicates that this component is rendered on the client-side

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material'; // Import Material UI components

export default function RegisterForm() {
  // State for managing form inputs
  const [formData, setFormData] = useState({
    username: '',
    role: '',
    email: '',
    pass: '',
  });

  const [responseMessage, setResponseMessage] = useState(''); // State for response messages

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
        bgcolor: '#767B91',
        boxShadow: 3,
        border: '2px solid white',
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        textAlign="center"
        fontWeight="bold"
        color="white"
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
            bgcolor: '#767B91',
            color: 'white',
            border: '2px solid white',
            '&:hover': {
              bgcolor: '#F7C59F',
              color: 'darkpink',
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
