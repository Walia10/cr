import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';
import '../Styles.css';

function ConfirmBooking() {
  const { roomId } = useParams();
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (endTime <= startTime) {
      setMessage("End time must be after start time.");
      return;
    }

    try {
      await API.post('reservations/', {
        room: parseInt(roomId),
        date,
        start_time: startTime,
        end_time: endTime,
      });

      setMessage("Reservation confirmed!");
    } catch (err) {
      setMessage("Reservation failed.");
      console.error("Error details:", err.response?.data || err.message); // ✅ show backend error
    }
  };

  return (
    <>
      <header>
        <h1>Confirm Your Reservation</h1>
        <p>You're booking room ID: {roomId}</p>
      </header>

      {message && (
        <div style={{ textAlign: 'center', fontWeight: 'bold', color: message.includes("failed") ? "red" : "green" }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Date:
          <input type="date" min={today} value={date} onChange={e => setDate(e.target.value)} required />
        </label>
        <label>Start Time:
          <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required />
        </label>
        <label>End Time:
          <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} required />
        </label>
        <button type="submit" className="btn btn-green">Confirm Reservation</button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="btn-yellow" onClick={() => navigate('/rooms')}>
          Back to Available Rooms
        </button>
      </div>
    </>
  );
}

export default ConfirmBooking;
