import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './userModel.js';


export function setupGoogleOAuth({ clientID, clientSecret, callbackURL }) {
  if (!clientID || !clientSecret || !callbackURL) {
    throw new Error('Missing required OAuth credentials');
  }

  passport.use(new GoogleStrategy({
    clientID,
    clientSecret,
    callbackURL
  }, async (_, __, profile, done) => {
    try {
      let user = await User.findOne({ email: profile.emails[0].value });
      if (!user) {
        user = await User.create({
          email: profile.emails[0].value,
          provider: 'google'
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));
}

export function googleAuth() {
  return passport.authenticate('google', { scope: ['profile', 'email'] });
}

export function googleAuthCallback() {
  return passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
  });
}
