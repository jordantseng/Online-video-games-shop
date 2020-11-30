import React from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createProductReview } from '../actions/product';
import useInput from '../hooks/useInput';
import Message from '../components/Message';

const CommentReview = () => {
  const [rating, setRating, bindRating] = useInput(0);
  const [comment, setComment, bindComment] = useInput('');

  const { user } = useSelector((state) => state.auth);
  const { data: product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const onReviewSubmitClick = (e) => {
    e.preventDefault();

    dispatch(createProductReview(product._id, { rating, comment }));
  };

  return (
    <>
      <h2>Write a Customer Review</h2>
      {!user && (
        <Message variant='primary'>
          Please <Link to='/login'>sign in</Link> to write a review
        </Message>
      )}
      <ListGroup variant='flush'>
        <ListGroup.Item>
          {user && (
            <Form onSubmit={onReviewSubmitClick}>
              <Form.Group controlId='rating'>
                <Form.Label>Rating</Form.Label>
                <Form.Control as='select' {...bindRating}>
                  <option value=''>Select...</option>
                  <option value='1'>1 - Poor</option>
                  <option value='2'>2 - Fair</option>
                  <option value='3'>3 - Good</option>
                  <option value='4'>4 - Very Good</option>
                  <option value='5'>5 - Excellent</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as='textarea'
                  row='3'
                  {...bindComment}></Form.Control>
              </Form.Group>
              <Button type='submit' varaint='primary'>
                Submit
              </Button>
            </Form>
          )}
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default CommentReview;
