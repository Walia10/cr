import React, { useEffect, useState } from 'react';
import API from '../api';
import '../Styles.css';
import LogoutButton from './LogoutButton';

function RoomList() {
  const [rooms, setRooms] = useState([]);

  console.log("RoomList component is rendering.");

  useEffect(() => {
    API.get('rooms/')
      .then(res => {
        console.log('ROOMS:', res.data);
        setRooms(res.data);
      })
      .catch(err => {
        console.error('ROOM FETCH ERROR:', err);
      });
  }, []);

  return (
    <div className="room-card-container">
      {rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        rooms.map(room => (
          <div className="room-card" key={room.id}>
            <h3>{room.name}</h3>
            <p>Capacity: {room.capacity}</p>
          </div>
        ))
      )}
    </div>
  );
} // ← This closing brace was missing

export default RoomList;
