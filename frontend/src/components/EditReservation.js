import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import '../Styles.css';

function EditReservation() {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    start_time: '',
    end_time: '',
    room_id: null, // ✅ required for update
  });
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    API.get(`/api/reservations/${reservationId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(res => {
        const data = res.data;
        setFormData({
          date: data.date,
          start_time: data.start_time,
          end_time: data.end_time,
          room_id: data.room.id, // ✅ grab room ID from nested room
        });
        setRoomName(data.room.name);
      })
      .catch(err => {
        alert("Failed to fetch reservation.");
        console.error(err);
      });
  }, [reservationId]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    API.put(`/api/reservations/${reservationId}/`, formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(() => {
        alert("Reservation updated successfully!");
        navigate('/mybookings');
      })
      .catch(err => {
        alert("Update failed.");
        console.error(err.response?.data || err.message);
      });
  };

  return (
    <>
      <header>
        <h1>Edit Reservation</h1>
        <p>Room: <strong>{roomName}</strong></p>
      </header>

      <form onSubmit={handleSubmit}>
        <label>
          <strong>Date:</strong>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <strong>Start Time:</strong>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <strong>End Time:</strong>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
          />
        </label>

        <button className="btn btn-pink" type="submit">Update Reservation</button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="btn-yellow" onClick={() => navigate('/mybookings')}>
          Cancel
        </button>
      </div>
    </>
  );
}

export default EditReservation;
