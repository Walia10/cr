import React, { useState } from 'react';
import API from '../api';
import LogoutButton from './LogoutButton';
import '../Styles.css';
<LogoutButton />

function AdminRoomForm() {
  const [room, setRoom] = useState({ name: '', location: '', capacity: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('rooms/', room)
      .then(() => alert('Room added'))
      .catch(() => alert('Failed to add room'));
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
      <h2>Add New Room</h2>
      <input placeholder="Name" onChange={e => setRoom({ ...room, name: e.target.value })} /><br />
      <input placeholder="Location" onChange={e => setRoom({ ...room, location: e.target.value })} /><br />
      <input placeholder="Capacity" type="number" onChange={e => setRoom({ ...room, capacity: e.target.value })} /><br />
      <button type="submit">Add Room</button>
    </form>
  );
}

export default AdminRoomForm;
