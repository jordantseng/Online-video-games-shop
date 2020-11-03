import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { fetchProduct, updateProduct } from '../actions/product';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

import useInput from '../hooks/useInput';

const ProductEdit = ({ match }) => {
  const [name, setName, bindName] = useInput('');
  const [price, setPrice, bindPrice] = useInput('');
  const [image, setImage, bindImage] = useInput('');
  const [brand, setBrand, bindBrand] = useInput('');
  const [category, setCategory, bindCategory] = useInput('');
  const [countInStock, setCountInStock, bindCountInStock] = useInput(0);
  const [description, setDescription, bindDescription] = useInput('');

  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const productId = match.params.id;

  const { loading, data: product, error, updated } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (!product || productId !== product._id) {
      dispatch(fetchProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [
    product,
    productId,
    dispatch,
    setName,
    setPrice,
    setImage,
    setBrand,
    setCategory,
    setCountInStock,
    setDescription,
  ]);

  const onSubmitClick = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct(productId, {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const onUploadFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);

    try {
      const { data } = await axios.post('/api/upload', formData, {
        'Content-Type': 'multipart/form-data',
      });

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <>
      <Link to="/admin/productList" className="btn btn-light my-3">
        Go back
      </Link>

      <FormContainer>
        {updated && <Message variant="success">Updated Successfully</Message>}
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message vairant="danger">{error}</Message>
        ) : (
          <Form onSubmit={onSubmitClick}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                {...bindName}></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                {...bindPrice}></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image"
                {...bindImage}></Form.Control>
              <Form.File
                id="image-file"
                label="Choose file"
                custom
                onChange={onUploadFile}></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                {...bindBrand}></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Cateogry</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                {...bindCategory}></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count InStock</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter count in stock"
                {...bindCountInStock}></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                {...bindDescription}></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEdit;
