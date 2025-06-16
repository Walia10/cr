import React, { useEffect, useState } from 'react';
import API from '../api';
import '../Styles.css';

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('users/')
      .then(res => setUsers(res.data))
      .catch(err => console.error("Failed to fetch users", err));
  }, []);

  const currentUserId = localStorage.getItem('user_id'); // assuming it's stored at login

  return (
    <>
      <header>
        <h1>Users</h1>
        <p>Manage user accounts below</p>
      </header>

      {users.map(user => (
        <div className="room-card" key={user.id} style={{ maxWidth: '600px', margin: '10px auto' }}>
          <span>
            <strong>{user.username}</strong>{user.email && ` - ${user.email}`}
          </span>
          <div style={{ marginTop: '10px' }}>
            <a href={`/admin/edit-user/${user.id}`} className="btn btn-yellow">Edit</a>{' '}
            {user.id !== parseInt(currentUserId) && (
              <a href={`/admin/delete-user/${user.id}`} className="btn btn-green">Delete</a>
            )}
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <a href="/admin/dashboard" className="btn btn-yellow">Back to Dashboard</a>
      </div>
    </>
  );
}

export default ManageUsers;
