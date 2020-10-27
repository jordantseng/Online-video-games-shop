import mongoose from 'mongoose';
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

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Delete user tasks when user is deleted
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
