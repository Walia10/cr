import React, { useEffect, useState } from 'react';
import API from '../api';
import LogoutButton from './LogoutButton';
import '../Styles.css';
<LogoutButton />

function AdminAllReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    API.get('reservations/')
      .then(res => setReservations(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>All Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <ul>
          {reservations.map(r => (
            <li key={r.id}>
              User ID: {r.user} | Room: {r.room} | Date: {r.date} | {r.start_time} - {r.end_time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminAllReservations;
