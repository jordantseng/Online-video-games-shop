import asyncHandler from 'express-async-handler';

import User from '../models/user.js';
import Product from '../models/product.js';

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
      wishList: user.wishList,
      token: { id: user.generateToken(), expiresIn: 3600 }, // for client saving
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

  const user = await User.findOne({ email }).populate(
    'wishList',
    'name rating price'
  );

  if (!user) {
    res.status(404);
    throw new Error('Invalid email or password');
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    wishList: user.wishList,
    token: { id: user.generateToken(), expiresIn: 3600 },
  });
});

// @desc update single user profile
// @route PUT /api/users
// @access PRIVATE
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name || user.name;
    user.password = password || user.password;

    const updatedUser = await user.save();

    res.send({
      name: updatedUser.name,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc update single user wishlist
// @route PUT /api/users/wishlist
// @access PRIVATE
export const updateWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.user._id)
    .select('-password')
    .populate('wishList', 'name rating price');

  if (user) {
    const alreadyExisted = user.wishList.find(
      (wish) => wish._id.toString() === productId
    );

    if (!alreadyExisted) {
      const prodcut = await Product.findById(productId).select(
        'name rating price'
      );
      user.wishList.push(prodcut);
    } else {
      user.wishList = user.wishList.filter((wish) => {
        return wish._id.toString() !== productId;
      });
    }

    await user.save();

    res.send(user.wishList);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc delete single user wish product
// @route DELETE /api/users/wishlist
// @access PRIVATE
export const deleteWishProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const user = await User.findById(req.user._id)
    .select('-password')
    .populate('wishList', 'name rating price');

  if (user) {
    user.wishList = user.wishList.filter(
      (wish) => wish.id.toString() !== productId
    );

    await user.save();
    res.send();
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc get all users
// @route GET /api/users
// @access PRIVATE (ADMIN ONLY)
export const getAllUsers = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const pageNumber = +req.query.pageNumber || 1;

  const count = await User.countDocuments();

  const users = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1));

  const page = {
    current: pageNumber,
    total: Math.ceil(count / pageSize),
  };

  res.send({ users, page });
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
