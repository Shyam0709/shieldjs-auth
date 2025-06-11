import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  provider: { type: String, default: 'local' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  refreshToken: String
}, { timestamps: true });

export default mongoose.model('User', userSchema);
