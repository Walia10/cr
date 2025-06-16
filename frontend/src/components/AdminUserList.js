import React, { useEffect, useState } from 'react';
import API from '../api';
import LogoutButton from './LogoutButton';

<LogoutButton />

function AdminUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('users/')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              ID: {user.id} | Username: {user.username} | Email: {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminUserList;
