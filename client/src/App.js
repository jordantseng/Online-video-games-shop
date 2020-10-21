import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from 'react-router-dom';

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

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/admin/orderList" component={OrderList} />
          <Route path="/admin/products/:id/edit" component={ProductEdit} />
          <Route path="/admin/productList" component={ProductList} />
          <Route path="/admin/userList" component={UserList} />
          <Route path="/admin/users/:id/edit" component={UserEdit} />
          <Route path="/orders/:id" component={Order} />
          <Route path="/placeorder" component={PlaceOrder} />
          <Route path="/payment" component={Payment} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/cart/:id?" component={Cart} />
          <Route path="/products/:id" component={Product} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/" component={Home} exact />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
