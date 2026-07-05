const express = require('express');
const authMiddleware = require('../middleware/auth');
const Habit = require('../models/Habit');
const User = require('../models/User');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch habits', error: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, category, frequency, pointsPerCompletion } = req.body;
    if (!title) return res.status(400).json({ message: 'Habit title required' });
    
    const habit = new Habit({
      userId: req.userId,
      title,
      description,
      category,
      frequency,
      pointsPerCompletion: pointsPerCompletion || 10
    });
    
    await habit.save();
    res.status(201).json({ message: 'Habit created', habit });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create habit', error: error.message });
  }
});

router.post('/:id/complete', authMiddleware, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    if (habit.userId.toString() !== req.userId) return res.status(403).json({ message: 'Not authorized' });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const alreadyCompleted = habit.completions.some(c => {
      const compDate = new Date(c.date);
      compDate.setHours(0, 0, 0, 0);
      return compDate.getTime() === today.getTime();
    });
    
    if (alreadyCompleted) return res.status(400).json({ message: 'Already completed today' });
    
    habit.totalCompleted += 1;
    habit.currentStreak += 1;
    if (habit.currentStreak > habit.longestStreak) habit.longestStreak = habit.currentStreak;
    
    const pointsEarned = habit.pointsPerCompletion + Math.floor(habit.currentStreak / 5) * 5;
    habit.completions.push({ date: new Date(), pointsEarned });
    
    await habit.save();
    
    const user = await User.findById(req.userId);
    user.totalPoints += pointsEarned;
    user.totalHabitsCompleted += 1;
    user.level = Math.floor(user.totalPoints / 100) + 1;
    await user.save();
    
    res.json({ message: 'Habit completed', pointsEarned, newLevel: user.level, totalPoints: user.totalPoints });
  } catch (error) {
    res.status(500).json({ message: 'Failed to complete habit', error: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    if (habit.userId.toString() !== req.userId) return res.status(403).json({ message: 'Not authorized' });
    
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete habit', error: error.message });
  }
});

module.exports = router;
