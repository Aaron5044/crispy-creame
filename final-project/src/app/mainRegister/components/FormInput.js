'use client';

import React from 'react';

export default function FormInput({ label, type, name, value, onChange, required }) {
    return (
        <div style={{ marginBottom: "10px" }}>
            <label htmlFor={name} style={{ display: "block", marginBottom: "5px" }}>{label}:</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
        </div>
    );
}
