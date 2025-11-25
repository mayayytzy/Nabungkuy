// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  // Cek user dari localStorage saat aplikasi dimuat
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Fungsi logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
      <Routes>
        {/* Login & Register: hanya bisa diakses kalau belum login */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login setUser={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />

        {/* Dashboard: hanya bisa diakses kalau sudah login */}
        <Route
          path="/"
          element={user ? <Dashboard user={user} logout={logout} /> : <Navigate to="/login" replace />}
        />

        {/* 404 → kembali ke halaman utama */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;