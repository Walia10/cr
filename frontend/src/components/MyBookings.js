import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import '../Styles.css';

function MyBookings() {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('api/my-reservations/')
      .then(res => setReservations(res.data))
      .catch(err => {
        console.error("Failed to fetch reservations", err);
      });
  }, []);

  return (
    <>
      <header>
        <h1>My Reservations</h1>
        <p>Here are your current bookings</p>
      </header>

      <div className="room-card-container">
        {reservations.length === 0 ? (
          <p>You have no current reservations.</p>
        ) : (
          reservations.map(res => (
            <div key={res.id}>
              <div className="room-card">
                <h3>{res.room.name}</h3>
                <p><strong>Date:</strong> {res.date}</p>
                <p><strong>Time:</strong> {res.start_time} - {res.end_time}</p>
              </div>
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => navigate(`/edit-reservation/${res.id}`)} className="btn btn-pink">
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="btn-green" onClick={() => navigate('/rooms')}>
          Book a New Room
        </button>
      </div>
    </>
  );
}

export default MyBookings;
