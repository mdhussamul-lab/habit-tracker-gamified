import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) setUser(JSON.parse(userData));
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <Router>
      <div className="app">
        {user && (
          <nav className="navbar">
            <div className="nav-container">
              <h1 className="logo">🎮 Habit Tracker</h1>
              <div className="nav-links">
                <span className="user-info">{user.username}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            </div>
          </nav>
        )}
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register setUser={setUser} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
