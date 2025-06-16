function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />

      {/* ⬇️ This is the added header section with class-based styles */}
      <header>
        <h1>Conference Room Reservations Portal</h1>
        <p>Welcome! Book your room easily.</p>
        <div>
          <a href="/login" className="btn btn-pink">Login / Register</a>
          <a href="/reserve" className="btn btn-yellow">My Bookings</a>
          <a href="/" className="btn btn-green">Start Booking</a>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<RoomList />} />
        <Route
          path="/reserve"
          element={
            <ProtectedRoute>
              <ReservationForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
