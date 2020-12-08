import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';

const EventCarousel = ({ events }) => {
  return (
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
