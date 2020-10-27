import asyncHandler from 'express-async-handler';

import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';

// @desc signup
// @route POST /api/users
// @access PUBLIC
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // for client saving
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc login
// @route POST /api/users/login
// @access PUBLIC
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // for client saving
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc get single user profile
// @route POST /api/users/profile
// @access PRIVATE
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc update single user profile
// @route PUT /api/users/profile
// @access PRIVATE
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name || user.name;
    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc get all users
// @route GET /api/users
// @access PRIVATE (ADMIN ONLY)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.send(users);
});

// @desc delete user
// @route DELETE /api/users/:id
// @access PRIVATE (ADMIN ONLY)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.send(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc get user by id
// @route GET /api/users/:id
// @access PRIVATE (ADMIN ONLY)
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.send(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc edit user by id
// @route PUT /api/users/:id
// @access PRIVATE (ADMIN ONLY)
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, isAdmin } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin;

    const updatedUser = await user.save();

    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});