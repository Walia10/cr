import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import '../Styles.css';

function DeleteUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await API.delete(`users/${userId}/`);
      alert("User deleted successfully!");
      navigate('/admin/users');
    } catch (error) {
      alert("Failed to delete user.");
      console.error(error);
    }
  };

  return (
    <div className="room-card" style={{ maxWidth: '500px', margin: '100px auto', padding: '30px' }}>
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this user?</p>
      <form onSubmit={handleDelete}>
        <button type="submit" style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
        <a href="/admin/users" className="btn" style={{ backgroundColor: '#ccc', marginLeft: '10px' }}>Cancel</a>
      </form>
    </div>
  );
}

export default DeleteUser;
