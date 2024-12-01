'use client';

import React from 'react';

export default function ResponseMessage({ message }) {
    if (!message) return null;

    const isError = message.startsWith("Error");

    return (
        <p style={{ marginTop: "20px", color: isError ? "red" : "green" }}>
            {message}
        </p>
    );
}
