import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <header className="navbar-header">
      <h1>Conference Room Reservations Portal</h1>
      <p>Plan smart. Reserve easy.</p>
      <div className="nav-buttons">
        <button onClick={() => navigate('/mybookings')} className="btn-yellow">My Bookings</button>
        <button onClick={() => navigate('/rooms')} className="btn-green">View Currently Available Rooms</button>
        <button onClick={handleLogout} className="btn-pink">Logout</button>
      </div>
    </header>
  );
}

export default Navbar;
