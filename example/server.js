import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import shield from '../src/index.js'; // import your ShieldJS module

dotenv.config();

const app = express();
app.use(express.json());
app.use(shield.rateLimiter); // Rate limit all routes

// Passport config for Google OAuth
app.use(passport.initialize());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// 🔐 AUTH ROUTES
app.post('/register', shield.register);
app.post('/login', shield.login);
app.post('/refresh', shield.refreshAccessToken);

// 🧪 PROTECTED ROUTE
app.get('/dashboard', shield.requireAuth, (req, res) => {
  res.send(`Welcome, user ${req.user.id}`);
});

// 👑 ADMIN ROUTE
app.get('/admin', shield.requireAuth, shield.requireRole('admin'), (req, res) => {
  res.send(`Hello Admin ${req.user.id}`);
});

// 🌐 GOOGLE OAUTH ROUTES
app.get('/auth/google', shield.googleAuth());
app.get('/auth/google/callback', shield.googleAuthCallback(), (req, res) => {
  res.json({ message: 'Google login successful', user: req.user });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
