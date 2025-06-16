import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import '../Styles.css';

<LogoutButton />
function Register() {
  const [data, setData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/register/', data)
      .then(() => {
        alert('Registration successful!');
        navigate('/login');
      })
      .catch(err => alert('Registration failed'));
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
      <h2>Register</h2>
      <input placeholder="Username" onChange={e => setData({ ...data, username: e.target.value })} /><br />
      <input placeholder="Password" type="password" onChange={e => setData({ ...data, password: e.target.value })} /><br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
