import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import '../Styles.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await API.post('api/login/', { username, password });

    // Store token and role
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);

    // Store user_id if your backend supports it (you’ll also need to return it!)
    if (response.data.user_id) {
      localStorage.setItem('user_id', response.data.user_id);
    }

    navigate('/rooms');
  } catch (error) {
    alert("Login failed");
    console.error("Login error:", error.response?.data || error.message);
  }
};


  return (
    <>
      <header>
        <h1>Welcome Back!</h1>
        <p>Please log in to continue</p>
      </header>

      <form onSubmit={handleLogin}>
        <label>
          <strong>Username:</strong>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <strong>Password:</strong>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn-green">Log In</button>
      </form>

      <p style={{ marginTop: '1rem' }}>Don’t have an account?</p>
      <a href="/register" className="btn btn-pink">Register Here</a>
    </>
  );
}

export default Login;
