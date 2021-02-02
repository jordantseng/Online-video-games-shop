import express from 'express';

import { getReviews, createReview } from '../controllers/reviewControllers.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.route('/:id').get(getReviews).post(auth, createReview);

export default router;
