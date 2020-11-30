import React from 'react';
import { ListGroup, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import history from '../history';
import Message from '../components/Message';

const OrderItems = ({ order }) => {
  const urlParams = history.location.pathname.split('/')[1];

  const items = urlParams === 'placeorder' ? 'cartItems' : 'orderItems';

  return (
    <ListGroup.Item>
      <h2>Order Items</h2>
      {order[items].length === 0 ? (
        <Message>Your cart is empty</Message>
      ) : (
        <ListGroup variant='flush'>
          {order[items].map((item, index) => {
            return (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={`/api/products/${item.product}/image`}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={4}>
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </ListGroup.Item>
  );
};

export default OrderItems;
