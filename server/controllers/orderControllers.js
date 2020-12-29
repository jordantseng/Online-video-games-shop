import asyncHandler from 'express-async-handler';
import Order from '../models/order.js';
import Product from '../models/product.js';
import { sendOrderEmail } from '../email/sendgrid.js';

// @desc Get all orders
// @route GET /api/orders
// @access Private (Admin only)
export const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const current = +req.query.pageNumber || 1;

  const count = await Order.countDocuments();

  const orders = await Order.find({})
    .limit(pageSize)
    .skip(pageSize * (current - 1))
    .populate('user', 'id name');

  const page = {
    current,
    total: Math.ceil(count / pageSize),
  };

  res.send({ orders, page });
});

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private (Admin only)
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    '_id name'
  );

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();

    res.send(order);
  } else {
    res.status(404);
    throw new Error('order not found');
  }
});

// @desc create new order
// @route POST /api/orders
// @access Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    await order.save();

    res.status(201).send(order);
  }
});

// @desc Get logged in user order
// @route GET /api/orders/myorders
// @access Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const current = +req.query.pageNumber || 1;

  const count = await Order.find({ user: req.user._id }).countDocuments();

  const orders = await Order.find({ user: req.user._id })
    .populate('user', 'name')
    .limit(pageSize)
    .skip(pageSize * (current - 1));

  const page = {
    current,
    total: Math.ceil(count / pageSize),
  };

  if (orders) {
    res.send({ orders, page });
  } else {
    res.status(404).send('order not found');
  }
});

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.send(order);
  } else {
    res.status(404);
    throw new Error('order not found');
  }
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // reduce product qty
  for (let item of order.orderItems) {
    let product = await Product.findById(item.product).select('countInStock');

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    if (product.countInStock === 0) {
      res.status(400);
      throw new Error('Out of Stock');
    }

    product.countInStock = product.countInStock - item.qty;

    await product.save();
  }

  order.isPaid = true;
  order.paidAt = Date.now();

  if (order.paymentMethod === 'Free') {
    order.paymentResult = null;
  } else {
    // provided by paypal
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
  }

  await order.save();

  sendOrderEmail(order);

  res.send(order);
});
