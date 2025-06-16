import React, { useState } from 'react';
import API from '../api';
import '../Styles.css';

function ReservationForm({ roomId }) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (endTime <= startTime) {
      alert("End time must be after start time.");
      return;
    }

    try {
      await API.post(`reservations/`, {
        room: roomId,
        date,
        start_time: startTime,
        end_time: endTime,
      });
      alert("Reservation confirmed!");
    } catch (error) {
      alert("Error submitting reservation.");
      console.error(error);
    }
  };

  return (
    <>
      <header>
        <h1>Reserve a Room</h1>
        <p>Please select a date and time to book your room.</p>
      </header>

      <form onSubmit={handleSubmit}>
        <label>
          <strong>Date:</strong>
          <input
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label>
          <strong>Start Time:</strong>
          <input
            type="time"
            name="start_time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>

        <label>
          <strong>End Time:</strong>
          <input
            type="time"
            name="end_time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="btn btn-green">Confirm Booking</button>
      </form>
    </>
  );
}

export default ReservationForm;
