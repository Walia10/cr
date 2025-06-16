import React, { useEffect, useState } from 'react';
import API from '../api';
import '../Styles.css';

function AdminAllReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    API.get('admin/reservations/')
      .then(res => setReservations(res.data))
      .catch(err => console.error("Failed to fetch reservations", err));
  }, []);

  return (
    <>
      <header>
        <h1>Manage Reservations</h1>
        <p>All user bookings are listed below.</p>
      </header>

      {reservations.map(res => (
        <div key={res.id} className="room-card" style={{ width: '70%', margin: '10px auto' }}>
          <span>
            <strong>Room:</strong> {res.room.name},&nbsp;
            <strong>User:</strong> {res.user.username},&nbsp;
            <strong>Date:</strong> {res.date},&nbsp;
            <strong>Time:</strong> {res.start_time} - {res.end_time}
          </span>
          <div className="buttons" style={{ marginTop: '10px' }}>
            <a href={`/admin/edit-reservation/${res.id}`} className="btn btn-yellow">Edit</a>
            <a href={`/admin/delete-reservation/${res.id}`} className="btn btn-green" style={{ marginLeft: '10px' }}>Delete</a>
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <a href="/admin/dashboard" className="btn btn-yellow">Back to Dashboard</a>
      </div>
    </>
  );
}

export default AdminAllReservations;
  