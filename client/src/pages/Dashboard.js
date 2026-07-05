import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard({ user, setUser }) {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({ title: '', description: '', category: 'Health' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/habits', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHabits(response.data);
    } catch (error) {
      console.error('Failed to fetch habits', error);
    }
  };

  const addHabit = async (e) => {
    e.preventDefault();
    if (!newHabit.title) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/habits', newHabit, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewHabit({ title: '', description: '', category: 'Health' });
      fetchHabits();
    } catch (error) {
      console.error('Failed to add habit', error);
    }
  };

  const completeHabit = async (habitId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/habits/${habitId}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedUser = { ...user, totalPoints: response.data.totalPoints, level: response.data.newLevel };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      fetchHabits();
    } catch (error) {
      console.error('Failed to complete habit', error);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/habits/${habitId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchHabits();
    } catch (error) {
      console.error('Failed to delete habit', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-value">⭐ {user.level}</div>
            <div className="stat-label">Level</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">✨ {user.totalPoints}</div>
            <div className="stat-label">Points</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">🔥 {habits.reduce((sum, h) => sum + h.currentStreak, 0)}</div>
            <div className="stat-label">Total Streak</div>
          </div>
          <Link to="/leaderboard" className="leaderboard-link">🏆 Leaderboard</Link>
        </div>

        <div className="add-habit-section">
          <h2>Add New Habit</h2>
          <form onSubmit={addHabit} className="habit-form">
            <input type="text" placeholder="Habit title" value={newHabit.title} onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })} required />
            <textarea placeholder="Description" value={newHabit.description} onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })} />
            <select value={newHabit.category} onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value })}>
              <option>Health</option>
              <option>Productivity</option>
              <option>Learning</option>
              <option>Fitness</option>
              <option>Mental Health</option>
              <option>Other</option>
            </select>
            <button type="submit" className="add-btn">Add Habit</button>
          </form>
        </div>

        <div className="habits-section">
          <h2>Your Habits</h2>
          {habits.length === 0 ? (
            <p className="no-habits">No habits yet. Create one to get started!</p>
          ) : (
            <div className="habits-grid">
              {habits.map((habit) => (
                <div key={habit._id} className="habit-card">
                  <h3>{habit.title}</h3>
                  <p>{habit.description}</p>
                  <div className="habit-stats">
                    <span>🔥 {habit.currentStreak}</span>
                    <span>✅ {habit.totalCompleted}</span>
                  </div>
                  <div className="habit-actions">
                    <button onClick={() => completeHabit(habit._id)} className="complete-btn">✓ Complete</button>
                    <button onClick={() => deleteHabit(habit._id)} className="delete-btn">🗑 Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
