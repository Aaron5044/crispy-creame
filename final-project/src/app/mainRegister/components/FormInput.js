'use client';

import React from 'react';

// Define the FormInput component which handles the input fields in forms
export default function FormInput({ label, type, name, value, onChange, required }) {
    return (
        <div style={{ marginBottom: "10px" }}>
            {/* Label for the input field */}
            <label htmlFor={name} style={{ display: "block", marginBottom: "5px" }}>
                {label}: {/* Displays the label passed as prop */}
            </label>
            <input
                type={type} // Specifies the type of input (e.g., text, password, email)
                name={name} // Name of the input field (used for identification)
                value={value} // Current value of the input field (binds it to the state)
                onChange={onChange} // Function to handle changes in the input value
                required={required} // Indicates if the input is mandatory
                style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} // Inline styling to make the input look good
            />
        </div>
    );
}
