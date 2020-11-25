import express from 'express';
import multer from 'multer';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  createProductReview,
  getTopProducts,
  uploadProductImage,
  getProductImage,
} from '../controllers/productControllers.js';
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

router.route('/').get(getProducts).post(auth, admin, createProduct);

router.route('/popular').get(getTopProducts);

router
  .route('/:id')
  .get(getProduct)
  .put(auth, admin, updateProduct)
  .delete(auth, admin, deleteProduct);

router.route('/:id/reviews').post(auth, createProductReview);

router
  .route('/:id/image')
  .get(getProductImage)
  .post(auth, upload.single('productImg'), uploadProductImage);

export default router;
