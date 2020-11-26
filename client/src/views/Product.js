import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

import useInput from '../hooks/useInput';
import { fetchProduct, createProductReview } from '../actions/product';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

const Product = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating, bindRating] = useInput(0);
  const [comment, setComment, bindComment] = useInput('');

  const {
    loading,
    loadingReview,
    data: product,
    error,
    errorReview,
  } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const productId = match.params.id;

  useEffect(() => {
    if (!product || productId !== product._id) {
      dispatch(fetchProduct(productId));
    } else {
      setRating(0);
      setComment('');
    }
  }, [dispatch, product, setRating, setComment, productId]);

  const onAddToCartClick = () => {
    // store the product id and qty in url
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const onReviewSubmitClick = (e) => {
    e.preventDefault();

    dispatch(createProductReview(productId, { rating, comment }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta
            title={product.name}
            description='We sell the best products for cheap'
            keywords='electronics'
          />
          <Link className='btn btn-light my-3' to='/'>
            Go back
          </Link>
          <Row>
            <Col md={6} style={{ display: 'flex' }}>
              <Image
                src={`/api/products/${product._id}/image`}
                alt={product.name}
                fluid
                style={{ margin: 'auto', height: '25rem' }}
              />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price:{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description:{product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup varient='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map(
                              (index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock < 1}
                      onClick={onAddToCartClick}>
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
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
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Product;
