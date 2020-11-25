import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import { fetchUserProfile, updateUserProfile } from '../actions/profile';
import { fetchMyOrders } from '../actions/myOrders';
import useInput from '../hooks/useInput';
import Message from '../components/Message';
import Loader from '../components/Loader';
import OrderTable from '../components/OrderTable';
import Paginate from '../components/Paginate';

const Profile = ({ history, location }) => {
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
  const { user } = useSelector((state) => state.auth);
  const {
    loading: loadingMyOrders,
    data: myOrders,
    page,
    error: errorOrders,
  } = useSelector((state) => state.myOrders);

  const pageNumber = location.pathname.split('page/')[1];

  useEffect(() => {
    if (!user) {
      history.replace('/login');
    } else {
      if (!profile) {
        dispatch(fetchUserProfile());
      } else {
        setName(profile.name);
        setEmail(profile.email);
      }
    }
  }, [user, history, profile, dispatch, setName, setEmail]);

  useEffect(() => {
    dispatch(fetchMyOrders(pageNumber));
  }, [dispatch, pageNumber]);

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
        {error ? <Message variant='danger'>{error}</Message> : null}
        {message ? <Message variant='danger'>{message}</Message> : null}
        {success ? (
          <Message variant='success'>Update successfully</Message>
        ) : null}
        {(loading || updating) && <Loader />}
        <Form onSubmit={onSubmitClick}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              {...bindName}
            />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              {...bindEmail}
            />
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              {...bindPassword}
            />
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confrim Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              {...bindConfirmPassword}
            />
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
        {loadingMyOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Router history={history}>
            <Switch>
              <Route
                path='/profile/page/:pageNumber'
                render={() => <OrderTable orders={myOrders} user={user} />}
              />
              <Route
                path='/profile'
                render={() => <OrderTable orders={myOrders} user={user} />}
              />
            </Switch>
            <Paginate path='/profile' pages={page.total} page={page.current} />
          </Router>
        )}
      </Col>
    </Row>
  );
};

export default Profile;
