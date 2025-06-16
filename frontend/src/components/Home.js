import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, isAdmin } from '../utils/auth';
import '../Styles.css';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      if (isAdmin()) {
        navigate('/admin/dashboard');
      } else {
        navigate('/rooms');
      }
    }
  }, []);

  return (
    <div>
      <header>
        <h1>Conference Room Reservations Portal</h1>
        <p>Welcome! Book your room easily.</p>
      </header>

      <div>
        <button className="btn btn-pink" onClick={() => navigate('/login')}>Login / Register</button>
        <button className="btn btn-yellow" onClick={() => navigate('/mybookings')}>My Bookings</button>
        <button className="btn btn-green" onClick={() => navigate('/rooms')}>Start Booking</button>
      </div>
    </div>
  );
}

export default Home;
