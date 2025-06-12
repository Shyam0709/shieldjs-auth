# ShieldJS-AUTH 🛡️
A Spring Security–like authentication and authorization module for Node.js + Express. Supports email/password, Google OAuth, JWT access & refresh tokens, and role-based access.

## 🚀 Features
- 🔐 JWT-based authentication
- 🔁 Access & refresh token support
- 🧪 Express middleware for route protection
- ⚡ Google OAuth 2.0 login
- 📊 Rate limiting middleware
- 🔒 Role-based authorization
- 🧱 MongoDB/Mongoose integration

## 📦 Installation

```bash
npm install shieldjs-auth


#Usage Example

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import shield from 'shieldjs';

dotenv.config();
const app = express();
app.use(express.json());
app.use(shield.rateLimiter); // Optional: apply rate limiting

// Auth routes
app.post('/register', shield.registerHandler);
app.post('/login', shield.localAuthHandler);
app.post('/token', shield.refreshTokenHandler);

// Google OAuth routes
app.get('/auth/google', shield.googleAuthHandler);
app.get('/auth/google/callback', shield.googleCallbackHandler);

// Protected route
app.get('/admin', shield.authenticateJWT, shield.authorizeRole('admin'), (req, res) => {
  res.send("Welcome, Admin!");
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch((err) => console.error(err));



🔐 Environment Variables
Create a .env file in your project root with:

PORT=portno
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
REFRESH_SECRET=your-refresh-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

📁 Project Structure

shieldjs-auth/
├── .env
├── .gitignore
├── README.md
├── package.json
├── example/
│   └── server.js
├── src/
│   ├── index.js
│   └── lib/
│       ├── auth.js
│       ├── middleware.js
│       ├── oauth.js
│       ├── rateLimiter.js
│       ├── refresh.js
│       └── userModel.js
└── test/
    └── auth.test.js 

🔧 Module Exports
ShieldJS-Auth exposes the following utilities:

registerHandler – handles new user registration

localAuthHandler – email/password login

refreshTokenHandler – refreshes access tokens

googleAuthHandler – initiates Google OAuth flow

googleCallbackHandler – handles Google OAuth callback

authenticateJWT – protects routes with access token

authorizeRole(role) – allows access only to specific roles

rateLimiter – rate limiting middleware for Express


