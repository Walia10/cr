import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import '../Styles.css';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('rooms/')
      .then(res => {
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
            <button
              className="btn-green"
              onClick={() => navigate(`/confirm/${room.id}`)}
            >
              Reserve
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default RoomList;
