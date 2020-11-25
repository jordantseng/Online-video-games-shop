import express from 'express';
import multer from 'multer';

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

const router = express.Router();

const upload = multer({
  limits: { fileSize: 1000000 }, // maximum: 1MB
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }
    cb(null, true);
  },
});

router
  .route('/')
  .get(auth, admin, getEvents)
  .post(auth, admin, upload.single('eventImg'), createEvent);
router
  .route('/:id')
  .get(auth, admin, getEvent)
  .put(auth, admin, upload.single('eventImg'), editEvent)
  .delete(auth, admin, deleteEvent);

router.route('/:id/image').get(getProductImage);

export default router;
