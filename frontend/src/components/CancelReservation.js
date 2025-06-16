import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import LogoutButton from './LogoutButton';

<LogoutButton />

function CancelReservation() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.confirm("Cancel this reservation?")) {
      API.delete(`reservations/${id}/`)
        .then(() => {
          alert("Reservation cancelled");
          navigate('/mybookings');
        });
    } else {
      navigate('/mybookings');
    }
  }, [id, navigate]);

  return <p>Processing...</p>;
}

export default CancelReservation;
