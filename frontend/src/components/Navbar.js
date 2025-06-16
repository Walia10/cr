import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, isAdmin } from '../utils/auth';
import '../Styles.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', background: '#303f9f', color: 'white' }}>
      <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>Home</Link>
      {isLoggedIn() && <Link to="/reserve" style={{ color: 'white', marginRight: '1rem' }}>Reserve</Link>}
      {isAdmin() && <Link to="/admin/dashboard" style={{ color: 'white', marginRight: '1rem' }}>Admin</Link>}

      <div style={{ float: 'right' }}>
        {!isLoggedIn() ? (
          <Link to="/login" style={{ color: 'white' }}>Login</Link>
        ) : (
          <button onClick={handleLogout} style={{ background: 'white', color: '#303f9f', border: 'none', padding: '5px 10px' }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
