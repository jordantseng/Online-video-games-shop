import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Image } from 'react-bootstrap';

import history from '../history';

import { fetchProduct } from '../actions/product';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Reviews from '../components/Reviews';
import CommentReview from '../components/CommentReview';
import ProductDetails from '../components/ProductDetails';
import AddProductToCart from '../components/AddProductToCart';

const Product = ({ match }) => {
  const {
    loading,
    loadingReview,
    data: product,
    error,
    errorReview,
  } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const productId = match.params.id;

  useEffect(() => {
    if (!product || productId !== product._id) {
      dispatch(fetchProduct(productId));
    }
  }, [dispatch, product, productId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Meta
            title={product.name}
            description='We sell the best products for cheap'
            keywords='electronics'
          />

          {/* banner */}
          {/* <div
            style={{
              backgroundImage: `url(/api/products/5fcdd25ce92bda1c0abb0fae/image)`,
              width: '100%',
              height: '300px',
            }}></div> */}

          {error && <Message variant='danger'>{error}</Message>}
          <Row>
            <Button
              className='my-3'
              variant='secondary'
              onClick={() => history.goBack()}>
              Go back
            </Button>
          </Row>
          <Row>
            <Col md={6}>
              <Image
                src={`/api/products/${product._id}/image`}
                alt={product.name}
                fluid
                style={{ margin: 'auto', height: '25rem' }}
              />
            </Col>
            <Col md={3}>
              <ProductDetails product={product} />
            </Col>
            <Col md={3}>
              <AddProductToCart product={product} />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Reviews
                product={product}
                errorReview={errorReview}
                loadingReview={loadingReview}
              />
              <CommentReview />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Product;
