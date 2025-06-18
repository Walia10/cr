import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles.css';

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <>
      <header>
        <h1>Conference Room Reservations Portal</h1>
        <p>Plan smart. Reserve easy.</p>
        {isLoggedIn && (
          <div style={{ marginTop: '15px' }}>
            <button className="btn btn-yellow" onClick={() => navigate('/mybookings')}>My Bookings</button>
            <button className="btn btn-green" onClick={() => navigate('/rooms')}>View Currently Available Rooms</button>
            <button className="btn btn-pink" onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}>Logout</button>
          </div>
        )}
      </header>

      <main style={{ marginTop: '60px', textAlign: 'center' }}>
        <h2>Welcome! Book your room easily.</h2>
        {!isLoggedIn ? (
          <button className="btn btn-pink" onClick={() => navigate('/login')}>Login / Register</button>
        ) : (
          <>
            <button className="btn btn-yellow" onClick={() => navigate('/mybookings')}>My Bookings</button>
            <button className="btn btn-green" onClick={() => navigate('/reserve')}>Start Booking</button>
          </>
        )}
      </main>
    </>
  );
}

export default Home;
