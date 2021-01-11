import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';
import Order from './order.js';

const { Schema, model } = mongoose;

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

userSchema.methods.generateToken = function () {
  const user = this;

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1hr',
  });

  return token;
};

userSchema.methods.matchPassword = async function (password) {
  const user = this;

  return await bcrypt.compare(password, user.password);
};

// Delete user orders when user is deleted
userSchema.pre('remove', async function (next) {
  const user = this;

  await Order.deleteMany({ user: user._id });

  next();
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = model('User', userSchema);

export default User;
