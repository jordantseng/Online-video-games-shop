import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { fetchOrders, updateOrderToDelivered } from '../actions/orderList';
import Message from '../components/Message';
import Loader from '../components/Loader';

const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  const { orders, error } = useSelector((state) => state.orderList);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      history.push('/login');
    } else {
      dispatch(fetchOrders());
    }
  }, [dispatch, history, user]);

  const onMarkAsDelivered = (id) => {
    dispatch(updateOrderToDelivered(id));
  };

  return (
    <>
      <h1>Orders</h1>
      {orders.length === 0 && !error ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/orders/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </Link>
                  {user.isAdmin && order.isPaid && !order.isDelivered && (
                    <Button
                      type="button"
                      className="btn-sm"
                      onClick={() => onMarkAsDelivered(order._id)}>
                      Mark as Delivered
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderList;
