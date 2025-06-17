import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ textAlign: 'center' }}>
      <h2 style={{ marginTop: '60px' }}>Welcome! Book your room easily.</h2>
      <div style={{ marginTop: '30px' }}>
        <button onClick={() => navigate('/login')} className="btn-pink">Login / Register</button>
        <button onClick={() => navigate('/mybookings')} className="btn-yellow">My Bookings</button>
        <button onClick={() => navigate('/rooms')} className="btn-green">Start Booking</button>
      </div>
    </div>
  );
}

export default Home;
