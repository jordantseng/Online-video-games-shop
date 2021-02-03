import asyncHandler from 'express-async-handler';
import Review from '../models/review.js';
import Product from '../models/product.js';
import User from '../models/user.js';

// @desc get reviews
// @route GET /api/:id
// @access Public
export const getReviews = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const current = +req.query.page || 1;

  const count = await Review.countDocuments();

  const reviews = await Review.find({ product_id: req.params.id })
    .limit(pageSize)
    .skip(pageSize * (current - 1));

  const page = {
    current,
    total: Math.ceil(count / pageSize),
    totalItems: count,
  };

  res.send({ reviews, page });
});

// @desc create review
// @route POST /api/:id
// @access Private
export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product_id = req.params.id;

  const product = await Product.findById(product_id).select('-image');

  if (product) {
    // check if user already reviewed
    // const users = await Review.find({ user: req.user.id });

    // if (users.length > 1) {
    //   res.status(400);
    //   throw new Error('Product alreay reviewed');
    // }

    const review = new Review({
      user: req.user._id,
      product_id,
      name: req.user.name,
      rating,
      comment,
    });

    await review.save();

    // create a page object
    const pageSize = 10;
    const current = 1;

    const count = await Review.countDocuments();

    const page = {
      current,
      total: Math.ceil(count / pageSize),
      totalItems: count,
    };

    // update the product rating and number of reviews
    const productReviews = await Review.find({ product_id });

    product.rating =
      productReviews.reduce((acc, review) => acc + review.rating, 0) /
      productReviews.length;

    product.numReviews = productReviews.length;

    await product.save();

    res.status(201).send({ review, page });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
