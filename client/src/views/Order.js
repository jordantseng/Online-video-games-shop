import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';

import { fetchMyOrder, updateOrderToPaid } from '../actions/order';

import Loader from '../components/Loader';
import Message from '../components/Message';
import OrderSummary from '../components/OrderSummary';
import ShippingDetails from '../components/ShippingDetails';
import PaymentMethod from '../components/PaymentMethod';
import OrderItems from '../components/OrderItems';
import Meta from '../components/Meta';

const Order = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, paying, data: order, error } = useSelector(
    (state) => state.order
  );
  const [sdkReady, setSdkReady] = useState(false);

  const orderId = match.params.id;

  useEffect(() => {
    const source = axios.CancelToken.source();

    const addPayPalScript = async () => {
      // to add a script tag that paypal needed
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || orderId !== order._id) {
      dispatch(fetchMyOrder(orderId, source.token));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }

    return () => {
      source.cancel();
    };
  }, [order, dispatch, orderId]);

  const renderPaymentButton = () => {
    if (order.isPaid) {
      return null;
    }

    switch (order.paymentMethod) {
      case 'Free':
        return (
          <Button
            className='d-block w-100'
            onClick={() =>
              dispatch(
                updateOrderToPaid(orderId, {
                  email_address: order.user.email,
                })
              )
            }>
            Free!
          </Button>
        );

      case 'Paypal':
        return !sdkReady ? (
          <Loader />
        ) : (
          <PayPalButton
            amount={order.totalPrice}
            onSuccess={(paymentResult) =>
              dispatch(updateOrderToPaid(orderId, paymentResult))
            }
          />
        );

      default:
        return null;
    }
  };

  return loading || paying ? (
    <Loader />
  ) : (
    <>
      <Meta title='Order' />
      {error && <Message variant='danger'>{error}</Message>}
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ShippingDetails order={order} />

            <PaymentMethod order={order} />

            <OrderItems order={order} />
          </ListGroup>
        </Col>

        <Col md={4}>
          <OrderSummary order={order} error={error}>
            {renderPaymentButton()}
          </OrderSummary>
        </Col>
      </Row>
    </>
  );
};

export default Order;
