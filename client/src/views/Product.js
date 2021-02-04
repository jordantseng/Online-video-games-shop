import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Image } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

import history from '../history';

import { fetchProduct } from '../actions/product';
import { fetchReviews } from '../actions/reviews';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import CommentReview from '../components/CommentReview';
import ProductDetails from '../components/ProductDetails';
import ProductAvailability from '../components/ProductAvailability';
import ReviewList from '../components/ReviewList';

const Product = ({ match }) => {
  const { loading, data: product, error } = useSelector(
    (state) => state.product
  );
  const [imgLoaded, setImgLoaded] = useState(false);

  const dispatch = useDispatch();

  const productId = match.params.id;

  useEffect(() => {
    dispatch(fetchProduct(productId));
    dispatch(fetchReviews(productId, 1));
  }, [dispatch, productId]);

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

          {error && <Message variant='danger'>{error}</Message>}
          <Row className='m-auto'>
            <Button
              className='mr-auto my-3'
              variant='secondary'
              onClick={() => history.goBack()}>
              Go back
            </Button>
          </Row>
          <Row>
            <Col md={4} className='d-flex align-items-center'>
              {!imgLoaded && (
                <div style={{ width: '100%' }}>
                  <Skeleton height={300} width={`100%`} />
                </div>
              )}

              <Image
                className='m-auto'
                src={`/api/products/${product._id}/image`}
                style={{ objectFit: 'contain', height: '300px' }}
                fluid
                alt={product.name}
                onLoad={() => setImgLoaded(true)}
              />
            </Col>
            <Col md={5}>
              <ProductDetails product={product} />
            </Col>
            <Col md={3}>
              <ProductAvailability product={product} />
            </Col>
          </Row>
          <Row>
            <Col>
              <CommentReview redirect={match.url} />
              <ReviewList productId={productId} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Product;
