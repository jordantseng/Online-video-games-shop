import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import useInput from '../hooks/useInput';

import { fetchUser, updateUser } from '../actions/user';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserEdit = ({ match }) => {
  const [name, setName, bindName] = useInput('');
  const [email, setEmail, bindEmail] = useInput('');
  const [isAdmin, setIsAdmin] = useInput(false);

  const { loading, data: user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userId = match.params.id;

  useEffect(() => {
    if (!user || userId !== user._id) {
      dispatch(fetchUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, userId, user, setName, setEmail, setIsAdmin]);

  const onSubmitClick = (e) => {
    e.preventDefault();

    dispatch(updateUser(user._id, { name, email, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/userList' className='btn btn-light my-3'>
        Go back
      </Link>

      <FormContainer>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message vairant='danger'>{error}</Message>
        ) : (
          <>
            <h1>Edit User</h1>
            <Form onSubmit={onSubmitClick}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your name'
                  {...bindName}></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  {...bindEmail}></Form.Control>
              </Form.Group>

              <Form.Group controlId='isAdmin'>
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
              </Form.Group>

              <Button type='submit' variant='primary'>
                Update
              </Button>
            </Form>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default UserEdit;
