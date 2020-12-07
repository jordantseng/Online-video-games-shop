import React from 'react';
import { ListGroup } from 'react-bootstrap';

import history from '../history';
import Message from '../components/Message';

const PaymentMethod = ({ order }) => {
  const urlParams = history.location.pathname.split('/')[1];

  return (
    <ListGroup.Item>
      <h2>Payment Method</h2>
      <p>
        <strong>Method: </strong>
        {JSON.parse(localStorage.getItem('paymentMethod'))}
      </p>
      {urlParams === 'orders' ? (
        order.isPaid ? (
          <Message variant='success'>
            Paid on {order.paidAt.split('T')[0]}
          </Message>
        ) : (
          <Message variant='danger'>Not paid</Message>
        )
      ) : null}
    </ListGroup.Item>
  );
};

export default PaymentMethod;
