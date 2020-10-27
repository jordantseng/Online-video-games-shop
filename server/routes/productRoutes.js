import express from 'express';
import {
  createProducts,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  createProductReview,
} from '../controllers/productControllers.js';
import auth, { admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getProducts).post(auth, admin, createProducts);
router
  .route('/:id')
  .get(getProduct)
  .put(auth, admin, updateProduct)
  .delete(auth, admin, deleteProduct);
router.route('/:id/reviews').post(auth, createProductReview);

export default router;
