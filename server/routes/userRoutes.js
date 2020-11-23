import express from 'express';
import {
  authUser,
  createUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  updateUser,
} from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = new express.Router();

router.route('/').get(auth, admin, getAllUsers).post(createUser);
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);
router.route('/login').post(authUser);
router
  .route('/:id')
  .get(auth, admin, getUser)
  .put(auth, admin, updateUser)
  .delete(auth, admin, deleteUser);

export default router;
