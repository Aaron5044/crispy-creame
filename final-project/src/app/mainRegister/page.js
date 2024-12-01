import React from 'react';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';

export default function RegisterPage() {
    return (
        <div style={styles.pageContainer}>
            <Navbar />
            <div style={styles.formWrapper}>
                <RegisterForm />
            </div>
        </div>
    );
}

const styles = {
    pageContainer: {
        backgroundImage: `url("https://i.pinimg.com/736x/09/f5/eb/09f5eb1d5ebb8d03ed612ff5098f8843.jpg")`, // Set the image URL
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center', // Center the image
        backgroundSize: 'cover', // Make the image cover the entire container
        position: 'relative', // To layer the overlay on top of the image
        minHeight: '100vh', // Full viewport height
        display: 'flex',
        flexDirection: 'column', // Vertical layout
        alignItems: 'center', // Center horizontally
        justifyContent: 'flex-start', // Align content at the top
    },
    formWrapper: {
        position: 'relative', // Ensure the form is above the background
        zIndex: 10, // Put the form above the background
        backdropFilter: 'blur(10px)', // Subtle blur effect
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly transparent white background to enhance the blur
        width: '100%',
        padding: '112px',
        borderRadius: '10px',
        marginTop: '50px', // Adjust the top margin for spacing
    },
};
