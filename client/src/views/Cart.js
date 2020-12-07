import React, { useEffect } from 'react';
import {
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addToCart, removeFromCart } from '../actions/cart';
import Message from '../components/Message';
import Meta from '../components/Meta';

const Cart = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? +location.search.split('=')[1] : 1;
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartClick = (id) => {
    dispatch(removeFromCart(id));
  };

  const onCheckOutClick = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <>
      <Meta title='Cart' />
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to='/'>Go back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => {
                return (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image
                          src={`/api/products/${item.product}/image`}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={3}>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as='select'
                          value={item.qty}
                          disabled={item.isPreOrder}
                          onChange={(e) =>
                            dispatch(addToCart(item.product, +e.target.value))
                          }>
                          {[...Array(item.countInStock).keys()].map((index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col>
                        <Button
                          type='button'
                          variant='ligth'
                          onClick={() => removeFromCartClick(item.product)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flsuh'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length < 1}
                  onClick={() => onCheckOutClick()}>
                  Procced To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
