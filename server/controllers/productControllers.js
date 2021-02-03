import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';
import sharp from 'sharp';

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .select('-image')
    .sort({ rating: -1 })
    .limit(4);

  res.send(products);
});

// @desc Get latest products (sorted by createdAtDate)
// @route GET /api/products/latest
// @access Public
export const getLatestProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .select('-image')
    .sort({ releaseDate: -1 })
    .limit(4);

  if (!products) {
    res.status(404);
    throw new Error('Latest products not found');
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
    .skip(pageSize * (current - 1))
    .select('-image');

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
  const product = await Product.findById(req.params.id).select('-image');

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.send(product);
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
    brand: '',
    category: '',
    countInStock: 0,
    numReviews: 0,
    description: 'sample',
    releaseDate: new Date().toISOString(),
  });

  await product.save();
  res.status(201).send(product);
});

// @desc Update product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    brand,
    category,
    countInStock,
    releaseDate,
    isPreOrder,
  } = req.body;

  const product = await Product.findById(req.params.id).select('-image');

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;
  product.releaseDate = releaseDate;
  product.isPreOrder = isPreOrder;

  if (req.file && req.file.buffer) {
    const buffer = await sharp(req.file.buffer).png().toBuffer();

    product.image = buffer;
  }

  await product.save();

  res.send(product);
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
