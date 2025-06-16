import React, { useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutButton from './LogoutButton';
import '../Styles.css';

<LogoutButton />
function ReservationForm() {
  const [room, setRoom] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('reservations/', {
      room: room,
      date: date,
      time: time
    })
    .then(response => {
      toast.success("✅ Reservation confirmed! Email sent.");
      setTimeout(() => navigate('/'), 2500);
    })
    .catch(error => {
      console.error(error);
      toast.error("❌ Failed to book. Try again.");
    });
  };

  return (
    <div className="container">
      <h2>Book a Room</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Room ID:</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reserve</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ReservationForm;
