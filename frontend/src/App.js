import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Styles.css';

import EditReservation from './components/EditReservation';

import Home from './components/Home';
import RoomList from './components/RoomList';
import Navbar from './components/Navbar';
import ReservationForm from './components/ReservationForm';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Register from './components/Register';
import MyBookings from './components/MyBookings';
import EditRoom from './components/EditRoom';
import EditUser from './components/EditUser';
import DeleteUser from './components/DeleteUser';
import ManageRooms from './components/ManageRoom';
import ManageUsers from './components/ManageUsers';
import AdminRoomForm from './components/AdminRoomForm';
import AdminAllReservations from './components/AdminAllReservations';
import ConfirmBooking from './components/ConfirmBooking';
import CancelReservation from './components/CancelReservation';
import DeleteRoom from './components/DeleteRoom';
import AdminUserList from './components/AdminUserList';

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('token') !== null;
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem('role') === 'admin';
  return isAdmin ? children : <Navigate to="/" />;
}

// Main wrapper that provides Router context
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const hideNavbarOn = ['/', '/login', '/register'];// List of paths where Navbar should be hidden
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ToastContainer />
      {!hideNavbarOn.includes(location.pathname) && !isAdminRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <RoomList />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/reserve"
          element={
            <ProtectedRoute>
              <ReservationForm />
            </ProtectedRoute>
          }
        />
          -<Route path="/edit-reservation/:reservationId" element={<EditReservation />} />
-
        <Route
          path="/confirm/:roomId"
          element={
            <ProtectedRoute>
              <ConfirmBooking />
            </ProtectedRoute>
          }
        />
          <Route path="/edit-reservation/:reservationId" element={<EditReservation />} />

        <Route
          path="/mybookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cancel-reservation/:id"
          element={
            <ProtectedRoute>
              <CancelReservation />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/rooms"
          element={
            <AdminRoute>
              <ManageRooms />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/user-list"
          element={
            <AdminRoute>
              <AdminUserList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-room"
          element={
            <AdminRoute>
              <AdminRoomForm />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/edit-room/:roomId"
          element={
            <AdminRoute>
              <EditRoom />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/delete-room/:roomId"
          element={
            <AdminRoute>
              <DeleteRoom />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/edit-user/:userId"
          element={
            <AdminRoute>
              <EditUser />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/delete-user/:userId"
          element={
            <AdminRoute>
              <DeleteUser />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reservations"
          element={
            <AdminRoute>
              <AdminAllReservations />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default AppWrapper;
