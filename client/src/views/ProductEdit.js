import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';

import axios from '../axios';
import { productFormValidationSchema } from '../validations';
import { fetchProduct, updateProduct } from '../actions/product';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Input from '../components/Input';
import ImageInput from '../components/ImageInput';

const initialValues = {
  name: '',
  price: '',
  brand: '',
  category: '',
  countInStock: '',
  description: '',
  releaseDate: new Date().toISOString().split('T')[0],
};

const brandOptions = [
  { title: '', value: '' },
  { title: 'Sony', value: 'sony' },
  { title: 'Nintendo', value: 'nintendo' },
  { title: 'Others', value: 'others' },
];

const categoryOptions = [
  { title: '', value: '' },
  { title: 'PS4 console', value: 'ps4 console' },
  { title: 'PS5 console', value: 'ps5 console' },
  { title: 'Switch console', value: 'switch console' },
  { title: 'PS4 games', value: 'ps4 games' },
  { title: 'PS5 games', value: 'ps5 games' },
  { title: 'Switch games', value: 'switch games' },
  { title: 'Others', value: 'others' },
];

const ProductEdit = ({ match }) => {
  const [productFormValues, setProductFormValues] = useState(null);

  const dispatch = useDispatch();
  const productId = match.params.id;

  const { loading, data: product, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (!product || productId !== product._id) {
      dispatch(fetchProduct(productId, source.token));
    } else {
      setProductFormValues({
        ...product,
        releaseDate: new Date(product.releaseDate).toISOString().split('T')[0],
      });
    }

    return () => {
      source.cancel();
    };
  }, [product, productId, dispatch, setProductFormValues]);

  const onSubmitClick = (productFormValues) => {
    const { releaseDate } = productFormValues;

    dispatch(
      updateProduct(productId, {
        ...productFormValues,
        releaseDate: new Date(releaseDate),
      })
    );
  };

  return (
    <>
      <Link to='/admin/productList' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1>Edit Product</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {product && (
              <Formik
                initialValues={productFormValues || initialValues}
                validationSchema={productFormValidationSchema}
                onSubmit={onSubmitClick}
                enableReinitialize>
                {({ isSubmitting }) => {
                  return (
                    <Form>
                      <Input label='Name' name='name' type='text' />
                      <Input label='Price' name='price' type='text' />
                      <ImageInput
                        label='Image'
                        name='image'
                        src={`/api/products/${productId}/image`}
                      />
                      <Input
                        label='Brand'
                        name='brand'
                        type='select'
                        options={brandOptions}
                      />
                      <Input
                        label='Category'
                        name='category'
                        type='select'
                        options={categoryOptions}
                      />
                      <Input
                        label='Count in stock'
                        name='countInStock'
                        type='text'
                      />
                      <Input
                        label='Description'
                        name='description'
                        type='textarea'
                      />
                      <Input
                        label='Release date'
                        name='releaseDate'
                        type='date'
                      />
                      <Input
                        label='Is Pre-order'
                        name='isPreOrder'
                        type='checkbox'
                      />

                      <Button
                        type='submit'
                        variant='primary'
                        className='d-block ml-auto'
                        disabled={isSubmitting}>
                        Update
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            )}
          </>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEdit;
