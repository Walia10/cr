import React, { useState, useEffect } from 'react';
import API from '../api';
import LogoutButton from './LogoutButton';
import '../Styles.css';
<LogoutButton />
import { useParams } from 'react-router-dom';

function EditRoom() {
  const { id } = useParams();
  const [room, setRoom] = useState({ name: '', location: '', capacity: '' });

  useEffect(() => {
    API.get(`rooms/${id}/`).then(res => setRoom(res.data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.put(`rooms/${id}/`, room)
      .then(() => alert('Room updated!'))
      .catch(() => alert('Update failed'));
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
      <h2>Edit Room</h2>
      <input value={room.name} onChange={e => setRoom({ ...room, name: e.target.value })} /><br />
      <input value={room.location} onChange={e => setRoom({ ...room, location: e.target.value })} /><br />
      <input type="number" value={room.capacity} onChange={e => setRoom({ ...room, capacity: e.target.value })} /><br />
      <button type="submit">Save</button>
    </form>
  );
}

export default EditRoom;
