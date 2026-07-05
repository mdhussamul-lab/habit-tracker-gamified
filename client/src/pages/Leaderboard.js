import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Leaderboard.css';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('/api/leaderboard');
      setLeaderboard(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch leaderboard', error);
      setLoading(false);
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-box">
        <h1>🏆 Global Leaderboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="leaderboard-table">
            {leaderboard.map((user, index) => (
              <div key={user._id} className="leaderboard-row">
                <div className="rank">{index + 1}</div>
                <div className="username">{user.username}</div>
                <div className="level">⭐ {user.level}</div>
                <div className="points">✨ {user.totalPoints}</div>
              </div>
            ))}
          </div>
        )}
        <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
      </div>
    </div>
  );
}

export default Leaderboard;
