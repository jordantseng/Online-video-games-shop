import express from 'express';
import {
  getEvents,
  getEvent,
  createEvent,
  editEvent,
  deleteEvent,
  getProductImage,
} from '../controllers/eventControllers.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import uploadImg from '../middleware/uploadImg.js';

const router = express.Router();

router
  .route('/')
  .get(getEvents)
  .post(auth, admin, uploadImg.single('eventImg'), createEvent);
router
  .route('/:id')
  .get(auth, admin, getEvent)
  .put(auth, admin, uploadImg.single('eventImg'), editEvent)
  .delete(auth, admin, deleteEvent);

router.route('/:id/image').get(getProductImage);

export default router;
