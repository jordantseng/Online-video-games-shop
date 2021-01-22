import React from 'react';
import { Row, Col, ListGroup, Card } from 'react-bootstrap';

const OrderSummary = ({ order, children }) => {
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
            <Col>Total</Col>
            <Col>${order.totalPrice}</Col>
          </Row>
        </ListGroup.Item>

        {children ? <ListGroup.Item>{children}</ListGroup.Item> : null}
      </ListGroup>
    </Card>
  );
};

export default OrderSummary;
