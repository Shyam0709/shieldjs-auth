import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from './userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async(req, res)=> {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed });
  await user.save();
  res.status(201).json({ message: 'User registered' });
}

export const login = async(req, res)=> {
  const { email, password } = req.body;
 try{ const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET,{expiresIn:'15m'});
  
  
  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
  user.refreshToken = refreshToken;
  await user.save();

  res.json({ accessToken: token, Refreshtoken : refreshToken });



}
catch (error) {
  res.status(500).json({ message: 'Server error' });
  console.error(error);
  }
}
