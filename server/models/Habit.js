const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, enum: ['Health', 'Productivity', 'Learning', 'Fitness', 'Mental Health', 'Other'], default: 'Other' },
  frequency: { type: String, enum: ['Daily', 'Weekly', 'Monthly'], default: 'Daily' },
  color: { type: String, default: '#3b82f6' },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  totalCompleted: { type: Number, default: 0 },
  pointsPerCompletion: { type: Number, default: 10 },
  completions: [{ date: { type: Date, default: Date.now }, pointsEarned: Number }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Habit', habitSchema);
