import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import '../Styles.css';

function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  useEffect(() => {
    API.get(`api/users/${userId}/`)
      .then(res => setUsername(res.data.username))
      .catch(err => console.error("Failed to fetch user data", err));
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.put(`users/${userId}/`, { username })
      .then(() => {
        alert("User updated successfully!");
        navigate('/admin/users');
      })
      .catch(err => {
        alert("Update failed.");
        console.error(err);
      });
  };

  return (
    <>
      <header>
        <h1>Edit User</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <label>
          <strong>Username:</strong>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn-yellow">Update</button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="/admin/users" className="btn btn-green">Cancel</a>
      </div>
    </>
  );
}

export default EditUser;
