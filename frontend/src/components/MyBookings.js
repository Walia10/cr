import React, { useEffect, useState } from 'react';
import API from '../api';
import '../Styles.css';


function MyBookings() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    API.get('my-reservations/')
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
                <a href={`/edit-reservation/${res.id}`} className="btn btn-pink">Edit</a>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a className="btn btn-green" href="/reserve">Book a New Room</a>
      </div>
    </>
  );
}

export default MyBookings;
