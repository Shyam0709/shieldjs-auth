import jwt from 'jsonwebtoken';
import User from './userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const { JWT_SECRET, REFRESH_SECRET } = process.env;

export async function generateRefreshToken(user) {
  const token = jwt.sign({ id: user._id }, REFRESH_SECRET, { expiresIn: '7d' });
  await User.findByIdAndUpdate(user._id, { refreshToken: token });
  return token;
}

export const refreshAccessToken = async(req, res)=> {
  const { refreshToken } = req.body;
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET,{expiresIn:'15m'});
    res.json({ accessToken });
  } catch {
    res.status(403).json({ message: 'Refresh token error' });
  }
}
