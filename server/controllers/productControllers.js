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
