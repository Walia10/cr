import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import '../Styles.css';

function EditRoom() {
  const { id } = useParams(); // room ID from route
  const navigate = useNavigate();
  const [room, setRoom] = useState({ name: '', location: '', capacity: '' });

  useEffect(() => {
    API.get(`rooms/${id}/`)
      .then(res => setRoom(res.data))
      .catch(err => console.error("Failed to load room data", err));
  }, [id]);

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.put(`rooms/${id}/`, room)
      .then(() => {
        alert("Room updated!");
        navigate('/admin/rooms');
      })
      .catch(err => {
        alert("Failed to update room.");
        console.error(err);
      });
  };

  return (
    <>
      <header>
        <h1>Edit Room</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <label>
          <strong>Room Name:</strong>
          <input
            type="text"
            name="name"
            value={room.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <strong>Location:</strong>
          <input
            type="text"
            name="location"
            value={room.location}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <strong>Capacity:</strong>
          <input
            type="number"
            name="capacity"
            value={room.capacity}
            onChange={handleChange}
            required
          />
        </label>

        <button className="btn btn-pink" type="submit">Update</button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a className="btn btn-yellow" href="/admin/rooms">Back to Rooms</a>
      </div>
    </>
  );
}

export default EditRoom;
