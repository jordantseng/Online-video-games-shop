import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';

import { createProductReview } from '../actions/product';
import Message from '../components/Message';
import { reviewFormValidationSchema } from '../validations';
import Input from './Input';

const initialValues = {
  rating: 1,
  comment: '',
};

const commentOptions = [
  { title: '1 - Poor', value: 1 },
  { title: '2 - Fair', value: 2 },
  { title: '3 - Good', value: 3 },
  { title: '4 - Very Good', value: 4 },
  { title: '5 - Excellent', value: 5 },
];

const CommentReview = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const onReviewSubmitClick = (reviewFormValues) => {
    dispatch(createProductReview(product._id, reviewFormValues));
  };

  return (
    <>
      <h2>Write a Customer Review</h2>
      {!user ? (
        <Message variant='primary'>
          Please <Link to='/login'>sign in</Link> to write a review
        </Message>
      ) : (
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <Formik
              initialValues={initialValues}
              validationSchema={reviewFormValidationSchema}
              onSubmit={onReviewSubmitClick}>
              {({ isSubmitting }) => {
                return (
                  <Form>
                    <Input
                      label='Rating'
                      name='rating'
                      type='select'
                      options={commentOptions}
                    />
                    <Input label='Comment' name='comment' type='textarea' />
                    <Button
                      className='d-block ml-auto'
                      type='submit'
                      varaint='primary'
                      disabled={isSubmitting}>
                      Submit
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </ListGroup.Item>
        </ListGroup>
      )}
    </>
  );
};

export default CommentReview;
