import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { signup } from '../actions/auth';
import FormContainer from '../components/FormContainer';
import ProfileForm from '../components/ProfileForm';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const Signup = ({ history, location }) => {
  const dispatch = useDispatch();
  const { loading, data: user, error } = useSelector((state) => state.auth);
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [history, user, redirect]);

  const onSignupClick = (name, email, password) => {
    dispatch(signup(name, email, password));
  };

  return (
    <>
      <Meta title='Signup' />
      <FormContainer>
        <h1>Signup</h1>
        {error ? <Message variant='danger'>{error}</Message> : null}
        {loading && <Loader />}
        <ProfileForm
          userInfo={user}
          onSubmitClick={onSignupClick}
          error={error}
        />
        <Row className='py-3'>
          <Col>
            Have an Account?
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default Signup;
