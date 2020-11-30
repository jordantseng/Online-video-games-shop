import React from 'react';
import { Row, Col, ListGroup, Card } from 'react-bootstrap';

import Message from '../components/Message';

const OrderSummary = ({ order, error, children }) => {
  return (
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>Order Summary</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Items</Col>
            <Col>${order.itemsPrice}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Shipping</Col>
            <Col>${order.shippingPrice}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Tax</Col>
            <Col>${order.taxPrice}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Total</Col>
            <Col>${order.totalPrice}</Col>
          </Row>
        </ListGroup.Item>
        {error && (
          <ListGroup.Item>
            <Message variant='danger'>{error}</Message>
          </ListGroup.Item>
        )}

        <ListGroup.Item>{children}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default OrderSummary;
