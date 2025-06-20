import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles.css';

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleProtectedNavigation = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <header>
        <h1>Conference Room Reservations Portal</h1>
        <p>Plan smart. Reserve easy.</p>
      </header>

      <main style={{ marginTop: '60px', textAlign: 'center' }}>
        <h2>Welcome! Book your room easily.</h2>
        <button className="btn btn-pink" onClick={() => navigate('/login')}>Login / Register</button>
        <button className="btn btn-yellow" onClick={() => handleProtectedNavigation('/mybookings')}>My Bookings</button>
        <button className="btn btn-green" onClick={() => handleProtectedNavigation('/reserve')}>Start Booking</button>
      </main>
    </>
  );
}

export default Home;
