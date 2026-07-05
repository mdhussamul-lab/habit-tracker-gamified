# 🎮 Habit Tracker with Gamification

A full-stack web application that tracks your daily habits and gamifies the experience with points, levels, streaks, and leaderboards!

## Features 🚀

- ✅ **User Authentication** - Secure login and registration
- 📝 **Habit Tracking** - Create and manage your habits
- 🎯 **Daily Completions** - Mark habits as completed
- ✨ **Points System** - Earn points for completing habits
- 📈 **Streaks** - Track your current and longest streaks
- 🏆 **Leaderboard** - Compete with other users
- ⭐ **Levels** - Level up as you earn more points
- 🎨 **Beautiful UI** - Modern and responsive design

## Tech Stack 🛠️

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Modern styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure 📁

```
habit-tracker-gamified/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Habit.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── habits.js
│   │   ├── leaderboard.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   └── index.js
├── client/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── styles/
│   └── package.json
├── package.json
└── .env.example
```

## Getting Started 🎯

### Prerequisites
- Node.js v14+
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mdhussamul-lab/habit-tracker-gamified.git
   cd habit-tracker-gamified
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your MongoDB URI and JWT secret

4. **Start the application**
   ```bash
   npm run dev
   ```

## API Endpoints 🔌

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Habits
- `GET /api/habits` - Get all habits
- `POST /api/habits` - Create habit
- `POST /api/habits/:id/complete` - Complete habit
- `DELETE /api/habits/:id` - Delete habit

### Leaderboard
- `GET /api/leaderboard` - Get top 100 users
- `GET /api/leaderboard/rank/:userId` - Get user rank

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

## Gamification System 🎮

### Points
- Earn points for each habit completion
- Default: 10 points per completion
- Bonus points for streaks

### Levels
- Start at Level 1
- Level up at 100 points per level

### Streaks
- Track current streak per habit
- Track longest streak achieved
- Visual 🔥 indicator

### Leaderboard
- Global ranking by points
- See top 100 users
- Track your rank

## Features to Add 🌟

- [ ] Habit categories with icons
- [ ] Weekly/monthly charts
- [ ] Friend system
- [ ] Habit reminders
- [ ] Mobile app
- [ ] Dark mode
- [ ] Achievement badges
- [ ] Social sharing

## License 📄

MIT License

## Support 💬

Create an issue if you have questions!

---

Happy tracking! 🚀 Build amazing habits and become a leaderboard champion! 🏆
