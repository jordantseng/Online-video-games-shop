import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPopularProducts } from '../actions/popular';
import { fetchLatestProducts } from '../actions/latestProducts';

import CardLoader from '../components/CardLoader';
import Message from '../components/Message';
import Product from '../components/Product';
import EventCarousel from '../components/EventCarousel';
import SearchBox from '../components/SearchBox';
import Meta from '../components/Meta';

const Home = () => {
  const dispatch = useDispatch();

  const {
    loading: popularLoading,
    data: popularProducts,
    error: popularError,
  } = useSelector((state) => state.popular);

  const {
    loading: latestLoading,
    data: latestProducts,
    error: latestError,
  } = useSelector((state) => state.latestProducts);

  useEffect(() => {
    dispatch(fetchPopularProducts());
    dispatch(fetchLatestProducts());
  }, [dispatch]);

  return (
    <>
      <Meta
        title='Home'
        description='We sell the best products for cheap'
        keywords='electronics'
      />

      <SearchBox />
      <EventCarousel />

      {latestLoading ? (
        <CardLoader />
      ) : latestError ? (
        <Message variant='danger'>{latestError}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {latestProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}

      {popularLoading ? (
        <CardLoader />
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
