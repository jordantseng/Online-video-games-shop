import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.send(products);
});

// @desc Get latest products (sorted by createdAtDate)
// @route GET /api/products/latest
// @access Public

export const getLatestProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(4);

  if (!products) {
    res.status(404);
    res.send('Latest products not found');
  }

  res.send(products);
});

// @desc Get products
// @route POST /api/products?keyword=&category=&pageNumber=
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  const match = {};
  const pageSize = 12;
  const current = +req.query.pageNumber || 1;

  if (req.query.category) {
    match.category = { $regex: req.query.category, $options: 'i' };
  }

  if (req.query.keyword) {
    match.name = { $regex: req.query.keyword, $options: 'i' };
  }

  const count = await Product.countDocuments({ ...match });
  const products = await Product.find({ ...match })
    .limit(pageSize)
    .skip(pageSize * (current - 1));

  const page = {
    current,
    total: Math.ceil(count / pageSize),
    totalItems: count,
  };

  res.send({ products, page });
});

// @desc Get product
// @route GET /api/products/:id
// @access Public
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.send(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Create product
// @route POST /api/products
// @access Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
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

// @desc Update product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
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

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private/Admin
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

// @desc upload product image
// @route POST /api/products/:id/image
// access Private
export const uploadProductImage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  product.image = req.file.buffer;

  await product.save();

  res.send();
});

// @desc get product image
// @route GET /api/products/:id/image
// @desc Public
export const getProductImage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product || !product.image) {
    res.status(404);
    throw new Error('Image not found');
  } else {
    res.set('Content-Type', 'image/jpg');
    res.send(product.image);
  }
});
