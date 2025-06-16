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
      setError("Something went wrong. Please fix the errors.");
      console.error(err);
    }
  };

  return (
    <>
      <header>
        <h1>Create Your Account</h1>
        <p>Join and start booking conference rooms easily!</p>
      </header>

      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleRegister}>
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
            value={password1}
            onChange={e => setPassword1(e.target.value)}
            required
          />
          <small style={{ color: '#666' }}>
            You can use any password. No restrictions.
          </small>
        </label>

        <label>
          <strong>Confirm Password:</strong>
          <input
            type="password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="btn btn-green">Register</button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Already have an account?</p>
        <a className="btn btn-pink" href="/login">Login Here</a>
      </div>
    </>
  );
}

export default Register;
