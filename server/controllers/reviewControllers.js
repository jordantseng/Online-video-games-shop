import asyncHandler from 'express-async-handler';
import Review from '../models/review.js';

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

  const user = await Review.find({ user: req.user._id });

  // if (user.length) {
  //   res.status(400);
  //   throw new Error('Product alreay reviewed');
  // }

  console.log(rating, comment);

  const review = new Review({
    user: req.user._id,
    product_id: req.params.id,
    name: req.user.name,
    rating,
    comment,
  });

  console.log(review);

  await review.save();

  res.send(review);
});
