import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ textAlign: 'center', marginTop: '60px' }}>
      <h2>Welcome! Book your room easily.</h2>
      <div className="nav-buttons">
        <button onClick={() => navigate('/login')} className="btn btn-pink">Login / Register</button>
        <button onClick={() => navigate('/mybookings')} className="btn btn-yellow">My Bookings</button>
        <button onClick={() => navigate('/rooms')} className="btn btn-green">Start Booking</button>
      </div>
    </div>
  );
}

export default Home;
