import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPopularProducts } from '../actions/popularProducts';
import { fetchLatestProducts } from '../actions/latestProducts';

import CardLoader from '../components/CardLoader';
import Message from '../components/Message';
import EventCarousel from '../components/EventCarousel';

import ProductCards from '../components/ProductCards';
import Meta from '../components/Meta';

const Home = () => {
  const dispatch = useDispatch();

  const {
    loading: popularLoading,
    data: popularProducts,
    error: popularError,
  } = useSelector((state) => state.popularProducts);

  const {
    loading: latestLoading,
    data: latestProducts,
    error: latestError,
  } = useSelector((state) => state.latestProducts);

  useEffect(() => {
    if (!popularProducts) {
      dispatch(fetchPopularProducts());
    }

    if (!latestProducts) {
      dispatch(fetchLatestProducts());
    }
  }, [dispatch, popularProducts, latestProducts]);

  return (
    <>
      <Meta title='Home' description='We sell the best products for cheap' />

      <EventCarousel />

      {latestLoading ? (
        <CardLoader />
      ) : latestError ? (
        <Message variant='danger'>{latestError}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <ProductCards products={latestProducts} />
        </>
      )}

      {popularLoading ? (
        <CardLoader />
      ) : popularError ? (
        <Message variant='danger'>{popularError}</Message>
      ) : (
        <>
          <h1>Popular Products</h1>
          <ProductCards products={popularProducts} />
        </>
      )}
    </>
  );
};

export default Home;
