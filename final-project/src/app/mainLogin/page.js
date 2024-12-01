'use client';  // <-- Add this directive at the very top

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './components/LoginForm';  // Import the LoginForm component
import Navbar from './components/Navbar'; // Import Navbar component
import styles from './style/style.module.css'; // Import the CSS Module

export default function LoginPage() {
    const [responseMessage, setResponseMessage] = useState('');
    const router = useRouter();

    const handleResponseMessage = (message) => {
        setResponseMessage(message);
    };

    const handleRedirect = (url) => {
        router.push(url);
    };

    return (
        <div className={styles.pageContainer}>
            {/* Navbar at the top */}
            <Navbar /> 

            {/* Content container with the login form */}
            <div className={styles.formWrapper}>
                <h2 className={styles.loginHeader}>Login</h2>

                <LoginForm 
                    onResponseMessage={handleResponseMessage} 
                    onRedirect={handleRedirect} 
                />

                {responseMessage && (
                    <p
                        style={{
                            marginTop: '20px',
                            color: responseMessage.startsWith('Error') ? 'red' : 'green',
                        }}
                    >
                        {responseMessage}
                    </p>
                )}
            </div>
        </div>
    );
}
