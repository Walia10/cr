import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles.css';

function Home() {
  return (
    <div>
      <header>
        <h1>Conference Room Reservations Portal</h1>
        <p>Welcome! Book your room easily.</p>
      </header>

      <div>
        <Link className="btn btn-pink" to="/login">Login / Register</Link>
        <Link className="btn btn-yellow" to="/mybookings">My Bookings</Link>
        <Link className="btn btn-green" to="/">Start Booking</Link>
      </div>
    </div>
  );
}

export default Home;
