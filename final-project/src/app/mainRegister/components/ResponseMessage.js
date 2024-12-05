'use client';

import React from 'react';

// Define the ResponseMessage component which takes a 'message' prop
export default function ResponseMessage({ message }) {
    // If no message is provided, return null to render nothing
    if (!message) return null;

    // Determine if the message is an error by checking if it starts with "Error"
    const isError = message.startsWith("Error");

    // Return a paragraph element displaying the message
    // Set the text color to red for errors, and green for success
    return (
        <p style={{ marginTop: "20px", color: isError ? "red" : "green" }}>
            {message} {/* Display the message content */}
        </p>
    );
}
