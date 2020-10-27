import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchUser, updateUser } from '../actions/userList';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserEdit = ({ match }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { user, error } = useSelector((state) => state.userList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.name || match.params.id !== user._id) {
      dispatch(fetchUser(match.params.id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, match.params.id, user]);

  const onSubmitClick = (e) => {
    e.preventDefault();

    dispatch(updateUser(user._id, { name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        Go back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {(!user.name || match.params.id !== user._id) && !error ? (
          <Loader />
        ) : user.error ? (
          <Message vairant="danger">{user.error}</Message>
        ) : (
          <Form onSubmit={onSubmitClick}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEdit;
