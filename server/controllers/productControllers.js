import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.send(products);
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.send(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export const createProducts = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample',
    price: 0,
    user: req.user._id,
    image: '/image/sample.jpg',
    brand: 'sample',
    category: 'sample',
    countInStock: 0,
    numReviews: 0,
    description: 'sample',
  });

  await product.save();
  res.status(201).send(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.decription = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    await product.save();
    res.send(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product alreay reviewed');
    }

    const review = {
      name: req.user.name,
      rating: +rating,
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => review.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).send(product.reviews);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
