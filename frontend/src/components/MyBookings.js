import React, { useEffect, useState } from 'react';
import API from '../api';
import LogoutButton from './LogoutButton';
import '../Styles.css';
<LogoutButton />

function MyBookings() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    API.get('reservations/')
      .then(res => setReservations(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>My Bookings</h2>
      {reservations.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {reservations.map(r => (
            <li key={r.id}>
              Room ID: {r.room} | Date: {r.date} | {r.start_time} - {r.end_time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyBookings;
