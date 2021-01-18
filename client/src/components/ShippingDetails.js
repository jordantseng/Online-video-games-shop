import React from 'react';
import { ListGroup } from 'react-bootstrap';

import history from '../history';
import Message from '../components/Message';

const ShippingDetails = ({ order }) => {
  const urlParams = history.location.pathname.split('/')[1];

  return (
    <ListGroup.Item>
      <h2>Shipping</h2>
      <p>
        <strong>Address: </strong>
        {order.shippingAddress.address}, {order.shippingAddress.city},
        {order.shippingAddress.postalCode},{order.shippingAddress.country}
      </p>

      {urlParams === 'orders' ? (
        order.isDelivered ? (
          <Message variant='success'>
            Delivered at {order.deliveredAt.split('T')[0]}
          </Message>
        ) : (
          <Message variant='danger'>Not delivered</Message>
        )
      ) : null}
    </ListGroup.Item>
  );
};

export default ShippingDetails;
