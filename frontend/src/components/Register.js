import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import '../Styles.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await API.post('register/', {
        username,
        password1,
        password2,
      });

      alert("Account created successfully!");
      navigate('/login');
    } catch (err) {
      let message = "Something went wrong. Please fix the errors below.";

      if (err.response && err.response.data) {
        const data = err.response.data;

        message = Object.entries(data)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('\n');
      }

      console.error("Register error:", message);
      setError(message);
    }
  };

  return (
    <div>
      <header>
        <h1>Create Your Account</h1>
        <p>Join and start booking conference rooms easily!</p>
      </header>

      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '10px', whiteSpace: 'pre-line' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} style={{ maxWidth: '400px', margin: 'auto' }}>
        <p>
          <label><strong>Username:</strong></label><br />
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </p>

        <p>
          <label><strong>Password:</strong></label><br />
          <input
            type="password"
            value={password1}
            onChange={e => setPassword1(e.target.value)}
            required
          />
          <small style={{ color: '#666' }}>
            You can use any password. No restrictions.
          </small>
        </p>

        <p>
          <label><strong>Confirm Password:</strong></label><br />
          <input
            type="password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            required
          />
        </p>

        <button type="submit" className="btn btn-green">Register</button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Already have an account?</p>
        <a className="btn btn-pink" href="/login">Login Here</a>
      </div>
    </div>
  );
}

export default Register;
