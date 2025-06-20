import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles.css';

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <main style={{ marginTop: '60px', textAlign: 'center' }}>
      {!isLoggedIn ? (
        <button className="btn btn-pink" onClick={() => navigate('/login')}>
          Login / Register
        </button>
      ) : (
        <>
          <button className="btn btn-yellow" onClick={() => navigate('/mybookings')}>
            My Bookings
          </button>
          <button className="btn btn-green" onClick={() => navigate('/reserve')}>
            Start Booking
          </button>
        </>
      )}
    </main>
  );
}

export default Home;
