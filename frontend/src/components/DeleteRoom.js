import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import '../Styles.css';

function DeleteRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await API.delete(`api/rooms/${roomId}/`);
      alert("Room deleted successfully.");
      navigate('/admin/rooms');
    } catch (err) {
      alert("Failed to delete room.");
      console.error(err);
    }
  };

  return (
    <div className="room-card" style={{ maxWidth: '500px', margin: '100px auto', padding: '30px' }}>
      <h2>Confirm Room Deletion</h2>
      <p>Are you sure you want to delete this room?</p>
      <form onSubmit={handleDelete}>
        <button type="submit" style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px' }}>
          Delete Room
        </button>
        <a href="/admin/rooms" className="btn" style={{ backgroundColor: '#ccc', marginLeft: '10px' }}>
          Cancel
        </a>
      </form>
    </div>
  );
}

export default DeleteRoom;
