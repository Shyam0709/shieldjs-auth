# ShieldJS-AUTH 🛡️ [![npm version](https://img.shields.io/npm/v/shieldjs-auth)](https://www.npmjs.com/package/shieldjs-auth)
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

import shield from 'shieldjs'; // or your actual package name

// Example: Using middleware
app.use(shield.rateLimiter);

// Auth routes
app.post('/register', shield.auth.registerHandler);
app.post('/login', shield.auth.localAuthHandler);
app.post('/token', shield.refresh.refreshTokenHandler);

// Google OAuth routes
app.get('/auth/google', shield.googleAuth);
app.get('/auth/google/callback', shield.googleAuthCallback);

// Protected route
app.get(
  '/admin',
  shield.middleware.requireAuth,
  shield.middleware.requireRole('admin'),
  (req, res) => {
    res.send("Welcome, Admin!");
  }
);


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

ShieldJS-Auth exposes the following utilities as properties of the default export:

auth: All authentication-related functions (e.g., auth.registerHandler, auth.localAuthHandler)

middleware: Middleware functions (e.g., middleware.requireAuth, middleware.requireRole)

refresh: Token/session refresh utilities

setupGoogleOAuth: Function to set up Google OAuth

googleAuth: Initiates Google OAuth flow

googleAuthCallback: Handles Google OAuth callback

rateLimiter: Express rate limiting middleware


