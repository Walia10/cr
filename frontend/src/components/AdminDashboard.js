import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import '../Styles.css';
<LogoutButton />

function AdminDashboard() {
  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <ul className="list-group">
        <li className="list-group-item"><Link to="/admin/add-room">Add Room</Link></li>
        <li className="list-group-item"><Link to="/admin/all-reservations">View All Reservations</Link></li>
        <li className="list-group-item"><Link to="/admin/users">Manage Users</Link></li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
