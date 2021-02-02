import React from 'react';
import { ListGroup } from 'react-bootstrap';

import Rating from '../components/Rating';

const Review = ({ review, style, lastReviewEleRef }) => {
  return lastReviewEleRef ? (
    <ListGroup.Item ref={lastReviewEleRef} style={style}>
      <strong>{review.name}</strong>
      <Rating value={review.rating} />
      <p>{review.createdAt.substring(0, 10)}</p>
      <p style={{ wordBreak: 'break-all', whiteSpace: 'normal' }}>
        {review.comment}
      </p>
    </ListGroup.Item>
  ) : (
    <ListGroup.Item style={style}>
      <strong>{review.name}</strong>
      <Rating value={review.rating} />
      <p>{review.createdAt.substring(0, 10)}</p>
      <p style={{ wordBreak: 'break-all', whiteSpace: 'normal' }}>
        {review.comment}
      </p>
    </ListGroup.Item>
  );
};

export default Review;
