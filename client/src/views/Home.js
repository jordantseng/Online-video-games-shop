import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../axios';
import { fetchPopularProducts } from '../actions/popularProducts';
import { fetchLatestProducts } from '../actions/latestProducts';
import { fetchEvents } from '../actions/events';

import CardLoader from '../components/CardLoader';
import Message from '../components/Message';
import EventCarousel from '../components/EventCarousel';
import ProductCards from '../components/ProductCards';
import Meta from '../components/Meta';

const Home = () => {
  const dispatch = useDispatch();

  const {
    loading: eventsLoading,
    data: events,
    error: eventsError,
  } = useSelector((state) => state.events);

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
    const source = axios.CancelToken.source();

    dispatch(fetchEvents(source.token));
    dispatch(fetchPopularProducts(source.token));
    dispatch(fetchLatestProducts(source.token));

    return () => {
      source.cancel();
    };
  }, [dispatch]);

  return (
    <>
      <Meta title='Home' />

      {eventsLoading ? null : eventsError ? (
        <Message variant='danger'>{eventsError}</Message>
      ) : (
        <EventCarousel events={events} />
      )}

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
