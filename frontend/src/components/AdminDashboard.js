import React from 'react';
import '../Styles.css';

function AdminDashboard() {
  return (
    <>
      <header>
        <h1>Welcome, Admin</h1>
        <p>Use the options below to manage the system.</p>
      </header>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <a className="btn btn-yellow" href="/admin/rooms">Manage Rooms</a>
        <br />
        <a className="btn btn-green" href="/admin/reservations">View All Reservations</a>
        <br />
        <a className="btn btn-pink" href="/admin/users">Manage Users</a>
        <br />
        <a className="btn" style={{ backgroundColor: '#ccc' }} href="/logout">Logout</a>
      </div>
    </>
  );
}

export default AdminDashboard;
