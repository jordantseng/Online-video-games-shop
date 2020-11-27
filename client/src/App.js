import React, { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from './actions/auth';

import history from './history';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './views/Home';
import Product from './views/Product';
import Cart from './views/Cart';
import Login from './views/Login';
import Signup from './views/Signup';
import Profile from './views/Profile';
import Shipping from './views/Shipping';
import Payment from './views/Payment';
import PlaceOrder from './views/PlaceOrder';
import Order from './views/Order';
import UserList from './views/UserList';
import UserEdit from './views/UserEdit';
import ProductList from './views/ProductList';
import ProductEdit from './views/ProductEdit';
import OrderList from './views/OrderList';
import Products from './views/Products';
import EventList from './views/EventList';
import EventEdit from './views/EventEdit';
import SearchResults from './views/SearchResults';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const tokenTimer = useRef();

  useEffect(() => {
    const now = new Date();
    if (user) {
      const tokenExpiresIn =
        new Date(user.token.expirationDate).getTime() - new Date(now).getTime();

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
  }, [dispatch, tokenTimer, user]);

  return (
    <Router history={history}>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route
              path='/admin/orderList/page/:pageNumber'
              component={OrderList}
            />
            <Route path='/admin/orderList' component={OrderList} />

            <Route path='/admin/products/:id/edit' component={ProductEdit} />
            <Route
              path='/admin/productList/page/:pageNumber'
              component={ProductList}
            />
            <Route path='/admin/productList' component={ProductList} />

            <Route path='/admin/users/:id/edit' component={UserEdit} />
            <Route
              path='/admin/userList/page/:pageNumber'
              component={UserList}
            />
            <Route path='/admin/userList' component={UserList} />

            <Route path='/admin/eventList/:id' component={EventEdit} />
            <Route path='/admin/eventList' component={EventList} />

            <Route path='/orders/:id' component={Order} />
            <Route path='/placeorder' component={PlaceOrder} />
            <Route path='/payment' component={Payment} />
            <Route path='/shipping' component={Shipping} />
            <Route path='/cart/:id?' component={Cart} />
            <Route path='/profile' component={Profile} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route
              path='/search/:keyword/page/:pageNumber'
              component={SearchResults}
            />
            <Route path='/search/:keyword' component={SearchResults} />
            <Route path='/search' component={SearchResults} />
            <Route path='/products/page/:pageNumber' component={Products} />
            <Route path='/products/category/:category' component={Products} />
            <Route path='/products/:id' component={Product} />
            <Route path='/products' component={Products} />
            <Route path='/' exact component={Home} />
            <Redirect to='/' />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
