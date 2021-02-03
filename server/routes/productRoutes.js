import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  getTopProducts,
  getProductImage,
  getLatestProducts,
} from '../controllers/productControllers.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import uploadImg from '../middleware/uploadImg.js';

const router = express.Router();

router.route('/').get(getProducts).post(auth, admin, createProduct);

router.route('/popular').get(getTopProducts);

router.route('/latest').get(getLatestProducts);

router
  .route('/:id')
  .get(getProduct)
  .put(auth, admin, uploadImg.single('productImg'), updateProduct)
  .delete(auth, admin, deleteProduct);

router.route('/:id/image').get(getProductImage);

export default router;
