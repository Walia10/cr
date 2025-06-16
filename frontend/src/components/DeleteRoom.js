import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import LogoutButton from './LogoutButton';
import '../Styles.css';
<LogoutButton />

function DeleteRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      API.delete(`rooms/${id}/`)
        .then(() => {
          alert("Room deleted");
          navigate('/admin');
        });
    } else {
      navigate('/admin');
    }
  }, [id, navigate]);

  return <p>Processing...</p>;
}

export default DeleteRoom;
