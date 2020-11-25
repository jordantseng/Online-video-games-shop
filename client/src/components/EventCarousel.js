import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetchEvents } from '../actions/events';
import Loader from './Loader';
import Message from './Message';

const EventCarousel = () => {
  const dispatch = useDispatch();
  const { loading, data: events, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {events.map((event) => (
        <Carousel.Item key={event._id}>
          <Link to={`${event.redirectUrl}`}>
            <Image
              src={`/api/events/${event._id}/image`}
              alt={event.name}
              fluid
            />

            <Carousel.Caption className='carousel-caption'>
              <h2>{event.title}</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default EventCarousel;
