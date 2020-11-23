import express from 'express';
import {
  addOrderItems,
  getOrder,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/orderControllers.js';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

router.route('/').get(auth, admin, getOrders).post(auth, addOrderItems);
router.route('/myorders').get(auth, getMyOrders);
router.route('/:id').get(auth, getOrder);
router.route('/:id/pay').put(auth, updateOrderToPaid);
router.route('/:id/deliver').put(auth, admin, updateOrderToDelivered);

export default router;
