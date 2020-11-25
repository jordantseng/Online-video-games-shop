import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPopularProducts } from '../actions/popular';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import EventCarousel from '../components/EventCarousel';
import Meta from '../components/Meta';

const Home = ({ match }) => {
  const dispatch = useDispatch();

  const {
    loading: popularLoading,
    data: popularProducts,
    error: popularError,
  } = useSelector((state) => state.popular);

  useEffect(() => {
    dispatch(fetchPopularProducts());
  }, [dispatch]);

  return (
    <>
      <Meta
        title='Home'
        description='We sell the best products for cheap'
        keywords='electronics'
      />

      <EventCarousel />
      {/* <h1>Latest Products</h1> */}

      {popularLoading ? (
        <Loader />
      ) : popularError ? (
        <Message variant='danger'>{popularError}</Message>
      ) : (
        <>
          <h1>Popular Products</h1>
          <Row>
            {popularProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Home;
