// useLogin.js
import { useState } from 'react';

const useLogin = (router) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoginSuccess(false); // Reset login success state before attempt

    try {
      const response = await fetch('../loginExample/api/apiLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError('An error occurred. Please try again.');
        return;
      }

      const data = await response.json();
      console.log(data); // Log the response to check the structure

      if (data.data === 'valid') {
        setLoginSuccess(true); // Set login success to true

        // Store session data in sessionStorage
        sessionStorage.setItem(
          'user',
          JSON.stringify({ email, role: data.role })
        );
        const userRole = data.role.toLowerCase();

        // Redirect based on role
        if (userRole === 'customer') {
          router.push('/customer'); // Redirect to customer page
        } else if (userRole === 'manager') {
          router.push('/manager'); // Redirect to manager page
        }
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loginSuccess,
    handleLogin,
  };
};

export default useLogin;
