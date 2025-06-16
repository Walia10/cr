import React, { useState } from 'react';
import API from '../api';
import '../Styles.css';

function AdminRoomForm() {
  const [room, setRoom] = useState({ name: '', location: '', capacity: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('rooms/', room)
      .then(() => alert('Room added successfully!'))
      .catch(() => alert('Failed to add room'));
  };

  return (
    <>
      <header>
        <h1>Add New Room</h1>
        <p>Fill in the room details below</p>
      </header>

      <form onSubmit={handleSubmit}>
        <label>
          <strong>Name:</strong>
          <input
            type="text"
            required
            value={room.name}
            onChange={e => setRoom({ ...room, name: e.target.value })}
          />
        </label>

        <label>
          <strong>Location:</strong>
          <input
            type="text"
            required
            value={room.location}
            onChange={e => setRoom({ ...room, location: e.target.value })}
          />
        </label>

        <label>
          <strong>Capacity:</strong>
          <input
            type="number"
            required
            value={room.capacity}
            onChange={e => setRoom({ ...room, capacity: e.target.value })}
          />
        </label>

        <button type="submit" className="btn btn-green">Add Room</button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a className="btn btn-yellow" href="/admin/rooms">Back to Room List</a>
      </div>
    </>
  );
}

export default AdminRoomForm;
