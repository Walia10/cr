import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import '../Styles.css';

function CancelReservation() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmAndCancel = async () => {
      if (window.confirm("Are you sure you want to cancel this reservation?")) {
        try {
          await API.delete(`reservations/${id}/`);
          alert("Reservation cancelled");
        } catch (error) {
          alert("Failed to cancel reservation");
        }
      }
      navigate('/mybookings');
    };

    confirmAndCancel();
  }, [id, navigate]);

  return <p style={{ textAlign: 'center', marginTop: '50px' }}>Processing cancellation...</p>;
}

export default CancelReservation;
