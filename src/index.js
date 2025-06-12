import * as auth from './lib/auth.js';
import * as middleware from './lib/middleware.js';
import * as refresh from './lib/refresh.js';
import {
  setupGoogleOAuth,
  googleAuth,
  googleAuthCallback
} from './lib/oauth.js';
import rateLimiter from './lib/rateLimiter.js';

export default {
  ...auth,
  ...middleware,
  ...refresh,
  setupGoogleOAuth,
  googleAuth,
  googleAuthCallback,
  rateLimiter,
};
