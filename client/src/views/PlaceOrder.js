import React from 'react';
import { Button, Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { createOrder } from '../actions/order';

import CheckoutSteps from '../components/CheckoutSteps';
import OrderSummary from '../components/OrderSummary';
import ShippingDetails from '../components/ShippingDetails';
import PaymentMethod from '../components/PaymentMethod';
import OrderItems from '../components/OrderItems';
import Meta from '../components/Meta';

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  // calculate prices
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;

  cart.totalPrice = +(cart.itemsPrice + cart.shippingPrice).toFixed(2);

  const onPlaceOrderClick = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: JSON.parse(localStorage.getItem('paymentMethod')),
        itemsPrice: cart.itemsPrice,
        // taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <Meta title='Place Order' />
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ShippingDetails order={cart} />

            <PaymentMethod order={cart} />

            <OrderItems order={cart} />
          </ListGroup>
        </Col>
        <Col md={4}>
          <OrderSummary order={cart} error={error}>
            <Button
              type='button'
              className='btn-block'
              disabled={cart.cartItems.length === 0}
              onClick={onPlaceOrderClick}>
              Place Order
            </Button>
          </OrderSummary>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrder;
