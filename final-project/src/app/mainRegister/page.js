import React from 'react'; 
import Navbar from '../TEMPLATES/NAVBAR/Navbar'; // Import Navbar component
import RegisterForm from './components/RegisterForm'; // Import RegisterForm component
import { Box } from '@mui/material'; // Import Box from Material UI
import { AutoAwesome } from '@mui/icons-material'; // Import an icon from Material UI

export default function RegisterPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh', // Set minimum height to 100% of the viewport height
        display: 'flex', // Use flexbox layout
        flexDirection: 'column', // Arrange items in a column
        alignItems: 'center', // Align items in the center horizontally
        justifyContent: 'flex-start', // Align items at the top vertically
        position: 'relative', // Set position as relative for layering elements
      }}
    >
      {/* Black and Pink Background */}
      <Box
        sx={{
          position: 'absolute', // Position it absolutely
          top: 0, // Align to the top of the parent
          left: 0, // Align to the left of the parent
          width: '50%', // Set the width to half of the parent
          height: '100%', // Set the height to 100% of the parent
          bgcolor: 'black', // Set background color to black
        }}
      />
      <Box
        sx={{
          position: 'absolute', // Position it absolutely
          top: 0, // Align to the top of the parent
          right: 0, // Align to the right of the parent
          width: '50%', // Set the width to half of the parent
          height: '100%', // Set the height to 100% of the parent
          bgcolor: '#8B1A4B', // Set background color to pink
        }}
      />
      
      {/* Foreground Content */}
      <Navbar /> // Include the Navbar component
      <Box
        sx={{
          zIndex: 2, // Ensure form appears above the background
          borderRadius: 2, // Apply rounded corners to the box
          mt: 6, // Apply top margin of 6 units
          p: 3, // Apply padding of 3 units
          width: '90%', // Set the width to 90% of the parent container
          maxWidth: 600, // Set maximum width to 600px
          boxShadow: 0, // Remove box shadow
          margin: '-5px auto' // Apply 5px margin on top and bottom, auto left/right
        }}

        // Include the RegisterForm component
      >

        
        <RegisterForm /> 
      </Box>
    </Box>
  );
}
