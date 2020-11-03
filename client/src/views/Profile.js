import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchUserProfile, updateUserProfile } from '../actions/profile';
import { fetchMyOrders } from '../actions/orders';
import useInput from '../hooks/useInput';
import Message from '../components/Message';
import Loader from '../components/Loader';

const Profile = ({ history }) => {
  const [name, setName, bindName] = useInput('');
  const [email, setEmail, bindEmail] = useInput('');
  const [password, setPassword, bindPassword] = useInput('');
  const [confirmPassword, setConfirmPassword, bindConfirmPassword] = useInput(
    ''
  );
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const { loading, data: profile, error, updating, success } = useSelector(
    (state) => state.profile
  );
  const { user, loggedIn } = useSelector((state) => state.auth);
  const {
    loading: loadingOrders,
    data: orders,
    error: errorOrders,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!user && !loggedIn) {
      history.replace('/login');
    } else {
      if (!profile) {
        dispatch(fetchUserProfile());
      } else {
        setName(profile.name);
        setEmail(profile.email);
      }
    }
  }, [user, loggedIn, history, profile, dispatch, setName, setEmail]);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const onSubmitClick = (e) => {
    e.preventDefault(e);

    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      setMessage('');
      dispatch(updateUserProfile({ name, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        {error ? <Message variant="danger">{error}</Message> : null}
        {message ? <Message variant="danger">{message}</Message> : null}
        {success ? (
          <Message variant="success">Update successfully</Message>
        ) : null}
        {(loading || updating) && <Loader />}
        <Form onSubmit={onSubmitClick}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              {...bindName}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...bindEmail}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              {...bindPassword}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confrim Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              {...bindConfirmPassword}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
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
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
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
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default Profile;
