import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';

import axios from '../axios';
import { fetchUser, updateUser } from '../actions/user';
import { userFormValidationSchema } from '../validations';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Input from '../components/Input';

const initialValues = {
  name: '',
  email: '',
  isAdmin: false,
};

const UserEdit = ({ match }) => {
  const [userFormValues, setUserFormValues] = useState(null);

  const { loading, data: user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userId = match.params.id;

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (!user || userId !== user._id) {
      dispatch(fetchUser(userId, source.token));
    } else {
      const { name, email, isAdmin } = user;

      setUserFormValues({ name, email, isAdmin });
    }

    return () => {
      source.cancel();
    };
  }, [dispatch, userId, user]);

  const onSubmitClick = (userFormValues) => {
    dispatch(updateUser(user._id, userFormValues));
  };

  return (
    <>
      <Link to='/admin/userList' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1>Edit User</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {user && (
              <Formik
                initialValues={userFormValues || initialValues}
                validationSchema={userFormValidationSchema}
                onSubmit={onSubmitClick}
                enableReinitialize>
                {({ isSubmitting }) => (
                  <>
                    <Form>
                      <Input label='Name' name='name' type='text' />
                      <Input label='Email' name='email' type='email' />
                      <Input label='Is Admin' name='isAdmin' type='checkbox' />
                      <Button
                        className='d-block ml-auto'
                        type='submit'
                        variant='primary'
                        disabled={isSubmitting}>
                        Update
                      </Button>
                    </Form>
                  </>
                )}
              </Formik>
            )}
          </>
        )}
      </FormContainer>
    </>
  );
};

export default UserEdit;
