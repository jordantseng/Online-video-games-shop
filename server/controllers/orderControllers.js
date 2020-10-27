import asyncHandler from 'express-async-handler';
import Order from '../models/order.js';

// @desc Get all orders
// @route GET /api/orders
// @access Private (Admin only)
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.send(orders);
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
  const orders = await Order.find({ user: req.user._id });

  if (orders) {
    res.send(orders);
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
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // provided by paypal
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.send(updatedOrder);
  } else {
    res.status(404);
    throw new Error('order not found');
  }
});


