
import React, { useEffect, useState } from 'react';
import API from '../api';
import LogoutButton from './LogoutButton';

<LogoutButton />
function RoomList() {
  const [rooms, setRooms] = useState([]);

  console.log("RoomList component is rendering.");  // ✅ inside the function


  useEffect(() => {
    API.get('rooms/')
      .then(res => {
        console.log('ROOMS:', res.data);  // ✅ Debug log
        setRooms(res.data);
      })
      .catch(err => {
        console.error('ROOM FETCH ERROR:', err);  // ✅ Error log
      });
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Available Rooms</h2>
      {rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        <ul>
          {rooms.map(room => (
            <li key={room.id}>
              {room.name} – Capacity: {room.capacity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RoomList;
