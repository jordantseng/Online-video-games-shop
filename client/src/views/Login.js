import React, { useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';

import { login } from '../actions/auth';
import { loginFormValidationSchema } from '../validations';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Input from '../components/Input';
import Meta from '../components/Meta';

const initialValues = {
  email: '',
  password: '',
};

const Login = ({ history, location }) => {
  const { loading, data: user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [history, user, redirect]);

  const onLoginClick = ({ email, password }) =>
    dispatch(login(email, password));

  return (
    <>
      <Meta title='Login' />
      <FormContainer>
        <h1>Login</h1>
        {error ? <Message variant='danger'>{error}</Message> : null}
        {loading && <Loader />}
        <Formik
          initialValues={initialValues}
          validationSchema={loginFormValidationSchema}
          onSubmit={onLoginClick}>
          {({ isSubmitting }) => (
            <Form>
              <Input label='Email' name='email' type='email' />
              <Input label='Password' name='password' type='password' />
              <Button
                className='d-block ml-auto'
                type='submit'
                variant='primary'
                disabled={isSubmitting}>
                Login
              </Button>
            </Form>
          )}
        </Formik>

        <Row className='py-3'>
          <Col>
            New Customer?
            <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default Login;
