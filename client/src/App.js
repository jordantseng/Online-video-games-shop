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
import ProtectedRoute from './components/ProtectedRoute';

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
            <ProtectedRoute
              path='/admin/orderList/page/:pageNumber'
              component={OrderList}
            />
            <ProtectedRoute path='/admin/orderList' component={OrderList} />
            <ProtectedRoute
              path='/admin/products/:id/edit'
              component={ProductEdit}
            />
            <ProtectedRoute
              path='/admin/productList/page/:pageNumber'
              component={ProductList}
            />
            <ProtectedRoute path='/admin/productList' component={ProductList} />

            <ProtectedRoute path='/admin/users/:id/edit' component={UserEdit} />
            <ProtectedRoute
              path='/admin/userList/page/:pageNumber'
              component={UserList}
            />
            <ProtectedRoute path='/admin/userList' component={UserList} />

            <ProtectedRoute path='/admin/eventList/:id' component={EventEdit} />
            <ProtectedRoute path='/admin/eventList' component={EventList} />

            <ProtectedRoute path='/orders/:id' component={Order} />
            <ProtectedRoute path='/placeorder' component={PlaceOrder} />
            <ProtectedRoute path='/payment' component={Payment} />
            <ProtectedRoute path='/shipping' component={Shipping} />
            <ProtectedRoute path='/profile' component={Profile} />
            <Route path='/cart/:id?' component={Cart} />
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
