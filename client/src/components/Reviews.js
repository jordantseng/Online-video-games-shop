import React from 'react';
import { ListGroup } from 'react-bootstrap';

import Message from '../components/Message';
import Rating from '../components/Rating';
import Loader from '../components/Loader';

const Reviews = ({ product, errorReview, loadingReview }) => {
  return (
    <>
      <h2>Reviews</h2>
      {errorReview && <Message variant='danger'>{errorReview}</Message>}
      {!loadingReview && product.reviews.length === 0 && (
        <Message variant='primary'>No Reviews</Message>
      )}
      <ListGroup variant='flush'>
        {loadingReview ? (
          <Loader />
        ) : (
          product.reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating value={review.rating} />
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </>
  );
};

export default Reviews;
