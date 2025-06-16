import React, { useEffect, useState } from 'react';
import API from '../api';
import '../Styles.css';

function ManageRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    API.get('rooms/')
      .then(res => setRooms(res.data))
      .catch(err => {
        console.error("Failed to fetch rooms", err);
      });
  }, []);

  return (
    <>
      <header>
        <h1>Manage Rooms</h1>
      </header>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <a className="btn btn-pink" href="/admin/add-room">Add New Room</a>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {rooms.map(room => (
          <li key={room.id} style={{ marginBottom: '20px' }}>
            <div className="room-card">
              <h3>{room.name}</h3>
              <p>{room.location} (Capacity: {room.capacity})</p>
              <a className="btn btn-yellow" href={`/admin/edit-room/${room.id}`}>Edit</a>{' '}
              <a className="btn btn-green" href={`/admin/delete-room/${room.id}`}>Delete</a>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a className="btn btn-yellow" href="/admin/dashboard">Back to Dashboard</a>
      </div>
    </>
  );
}

export default ManageRooms;
