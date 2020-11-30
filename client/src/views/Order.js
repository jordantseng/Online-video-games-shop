import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
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

const Order = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, paying, data: order, error } = useSelector(
    (state) => state.order
  );
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;

  useEffect(() => {
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
      dispatch(fetchMyOrder(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, dispatch, orderId]);

  const onPayClick = (paymentResult) => {
    dispatch(updateOrderToPaid(orderId, paymentResult));
  };

  const renderPaypalButton = () => {
    if (!order.isPaid) {
      return !sdkReady ? (
        <Loader />
      ) : (
        <PayPalButton amount={order.totalPrice} onSuccess={onPayClick} />
      );
    }
    return null;
  };

  return loading || paying ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
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
            {renderPaypalButton()}
          </OrderSummary>
        </Col>
      </Row>
    </>
  );
};

export default Order;
