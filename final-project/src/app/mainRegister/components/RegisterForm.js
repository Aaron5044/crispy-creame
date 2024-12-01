'use client';

import React, { useState } from 'react';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        pass: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const params = new URLSearchParams({
                username: formData.username,
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
        <div
            style={{
                maxWidth: '500px',
                margin: '90px auto',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#1c1c1c', // Matte black background
                padding: '30px',
                borderRadius: '8px',
                height: 'auto', // Flexible height
                width: '500px', // Responsive width
            }}
        >
            <h2
                style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#fff', // White text for the title
                    paddingBottom: '20px',
                    marginBottom: '20px',
                    borderBottom: '2px solid #D40076', // Dark pink border
                }}
            >
                SIGN UP
            </h2>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    paddingTop: '20px',
                    borderRadius: '8px',
                    backgroundColor: '#1c1c1c', // Matte black background for form
                    width: '100%', // Full width of the form
                }}
            >
                <label
                    htmlFor="username"
                    style={{
                        fontWeight: 'bold',
                        color: '#B0B0B0', // Grey text for labels
                        marginBottom: '5px',
                    }}
                >
                    First Name:
                </label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    style={{
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #B0B0B0', // Grey border
                        backgroundColor: '#1c1c1c', // Matte black background for input
                        color: '#fff', // White text
                    }}
                />

                <label
                    htmlFor="email"
                    style={{
                        fontWeight: 'bold',
                        color: '#B0B0B0', // Grey text for labels
                        marginBottom: '5px',
                    }}
                >
                    Email:
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #B0B0B0', // Grey border
                        backgroundColor: '#1c1c1c', // Matte black background for input
                        color: '#fff', // White text
                    }}
                />

                <label
                    htmlFor="password"
                    style={{
                        fontWeight: 'bold',
                        color: '#B0B0B0', // Grey text for labels
                        marginBottom: '5px',
                    }}
                >
                    Password:
                </label>
                <input
                    type="password"
                    name="pass"
                    value={formData.pass}
                    onChange={handleChange}
                    required
                    style={{
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #B0B0B0', // Grey border
                        backgroundColor: '#1c1c1c', // Matte black background for input
                        color: '#fff', // White text
                    }}
                />

                <button
                    type="submit"
                    style={{
                        marginTop: '20px',
                        padding: '10px',
                        backgroundColor: '#1c1c1c', // Matte black background for button
                        color: '#D40076', // Dark pink text for button
                        border: '2px solid #D40076', // Dark pink border
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        width: '100%', // Full width for button
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#333'} // Hover effect
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#1c1c1c'}
                >
                    REGISTER
                </button>
            </form>

            {responseMessage && (
                <p
                    style={{
                        marginTop: '20px',
                        color: responseMessage.startsWith('Error') ? 'red' : 'green',
                        textAlign: 'center', // Center the response message
                    }}
                >
                    {responseMessage}
                </p>
            )}
        </div>
    );
}
