import React, { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from './actions/auth';

import history from './history';
import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './components/Routes';

const App = () => {
  const dispatch = useDispatch();
  const { data: authUser } = useSelector((state) => state.auth);

  const tokenTimer = useRef();

  useEffect(() => {
    const now = new Date();
    if (authUser) {
      const tokenExpiresIn =
        new Date(authUser.token.expirationDate).getTime() - new Date(now).getTime();

      if (tokenExpiresIn > 0) {
        tokenTimer.current = setTimeout(() => {
          dispatch(logout());
        }, tokenExpiresIn);
      } else {
        dispatch(logout());
      }
    }

    return () => {
      clearTimeout(tokenTimer.current);
    };
  }, [dispatch, tokenTimer, authUser]);

  return (
    <Router history={history}>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
