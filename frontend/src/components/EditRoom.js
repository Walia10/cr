import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import '../Styles.css';

function EditRoom() {
  const { roomId } = useParams();  // expects /admin/edit-room/:roomId
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: ''
  });

  useEffect(() => {
    API.get(`api/rooms/${roomId}/`)
      .then(res => setFormData(res.data))
      .catch(err => console.error("Failed to fetch room data", err));
  }, [roomId]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.put(`rooms/${roomId}/`, formData)
      .then(() => {
        alert("Room updated successfully!");
        navigate('/admin/rooms');
      })
      .catch(err => {
        alert("Update failed");
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
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <strong>Location:</strong>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <strong>Capacity:</strong>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
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
