import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { updateOrderToDelivered } from '../actions/orders';
import Message from '../components/Message';

const OrderTable = ({ orders, user, inProfilePage = false }) => {
  const dispatch = useDispatch();

  const renderOrders = orders.map((order) => (
    <tr key={order._id}>
      <td>
        <Link to={`/orders/${order._id}`}>{order._id}</Link>
      </td>
      <td>{order.user.name}</td>
      <td>{order.createdAt.split('T')[0]}</td>
      <td>${order.totalPrice}</td>
      <td>
        {order.isPaid ? (
          order.paidAt.substring(0, 10)
        ) : (
          <i className='fas fa-times' style={{ color: 'red' }}></i>
        )}
      </td>
      <td>
        {order.isDelivered ? (
          order.deliveredAt.substring(0, 10)
        ) : (
          <i className='fas fa-times' style={{ color: 'red' }}></i>
        )}
      </td>
      <td>
        {!inProfilePage && user.isAdmin && order.isPaid && !order.isDelivered && (
          <Button
            type='button'
            className='btn-sm ml-1'
            onClick={() => onMarkAsDelivered(order._id)}>
            Delivered
          </Button>
        )}
      </td>
    </tr>
  ));

  const onMarkAsDelivered = (id) => {
    dispatch(updateOrderToDelivered(id));
  };

  return (
    <>
      {orders.length === 0 ? (
        <Message>You don't have any order yet.</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>{renderOrders}</tbody>
        </Table>
      )}
    </>
  );
};

export default OrderTable;
