import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
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
  const { user } = useSelector((state) => state.auth);

  const previewImage = useRef();

  useEffect(() => {
    if (!product || productId !== product._id) {
      dispatch(fetchProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
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
    const reader = new FileReader();

    if (file) {
      reader.onload = function (e) {
        previewImage.current.src = e.target.result;
      };
      reader.readAsDataURL(file);

      formData.append('productImg', file);
      setUploading(true);

      try {
        await axios.post(`/api/products/${productId}/image`, formData, {
          headers: { Authorization: `Bearer ${user.token.id}` },
          'Content-Type': 'multipart/form-data',
        });

        setUploading(false);
      } catch (error) {
        setUploading(false);
      }
    }
  };

  return (
    <>
      <Link to='/admin/productList' className='btn btn-light my-3'>
        Go back
      </Link>

      <FormContainer>
        {updated && <Message variant='success'>Updated Successfully</Message>}
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message vairant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={onSubmitClick}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your name'
                {...bindName}></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter price'
                {...bindPrice}></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>
                <div>Image</div>
                <Image
                  ref={previewImage}
                  src={`/api/products/${productId}/image`}
                  rounded
                  fluid
                />
              </Form.Label>
              <Form.File
                id='image-file'
                label='Choose file'
                custom
                onChange={onUploadFile}></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>

              <Form.Control as='select' {...bindBrand}>
                <option value='Sony'>Sony</option>
                <option value='Nintendo'>Nintendo</option>
                <option value='Others'>Others</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Cateogry</Form.Label>
              <Form.Control as='select' {...bindCategory}>
                <option value='PS4 console'>PS4 console</option>
                <option value='PS5 console'>PS5 console</option>
                <option value='Switch'>Switch console</option>
                <option value='PS4 games'>PS4 games</option>
                <option value='PS5 games'>PS5 games</option>
                <option value='Switch games'>Switch games</option>
                <option value='Others'>Others</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count InStock</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter count in stock'
                {...bindCountInStock}></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows='5'
                placeholder='Enter description'
                {...bindDescription}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEdit;
