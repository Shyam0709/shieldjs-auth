import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './userModel.js';
import dotenv from 'dotenv';
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (_, __, profile, done) => {
  let user = await User.findOne({ email: profile.emails[0].value });
  if (!user) {
    user = await User.create({
      email: profile.emails[0].value,
      provider: 'google'
    });
  }
  return done(null, user);
}));

export function googleAuth() {
  return passport.authenticate('google', { scope: ['profile', 'email'] });
}

export function googleAuthCallback() {
  return passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
  });
}
