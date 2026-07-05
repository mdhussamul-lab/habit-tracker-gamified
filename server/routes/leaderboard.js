const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const leaderboard = await User.find()
      .select('username totalPoints level totalHabitsCompleted currentStreak')
      .sort({ totalPoints: -1 })
      .limit(100);
    
    const leaderboardWithRank = leaderboard.map((user, index) => ({ rank: index + 1, ...user.toObject() }));
    res.json(leaderboardWithRank);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error: error.message });
  }
});

router.get('/rank/:userId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const rank = await User.countDocuments({ totalPoints: { $gt: user.totalPoints } });
    res.json({ rank: rank + 1, username: user.username, totalPoints: user.totalPoints, level: user.level });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rank', error: error.message });
  }
});

module.exports = router;
