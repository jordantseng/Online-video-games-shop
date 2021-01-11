import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../views/Home';
import Product from '../views/Product';
import Cart from '../views/Cart';
import Login from '../views/Login';
import Signup from '../views/Signup';
import Profile from '../views/Profile';
import Shipping from '../views/Shipping';
import Payment from '../views/Payment';
import PlaceOrder from '../views/PlaceOrder';
import Order from '../views/Order';
import UserList from '../views/UserList';
import UserEdit from '../views/UserEdit';
import ProductList from '../views/ProductList';
import ProductEdit from '../views/ProductEdit';
import OrderList from '../views/OrderList';
import Products from '../views/Products';
import EventList from '../views/EventList';
import EventEdit from '../views/EventEdit';
import SearchResults from '../views/SearchResults';

import AdminProtectedRoute from './AdminProtectedRoute';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return (
    <Switch>
      <AdminProtectedRoute
        path='/admin/orderList/page/:pageNumber'
        component={OrderList}
      />
      <AdminProtectedRoute path='/admin/orderList' component={OrderList} />
      <AdminProtectedRoute
        path='/admin/products/:id/edit'
        component={ProductEdit}
      />
      <AdminProtectedRoute
        path='/admin/productList/page/:pageNumber'
        component={ProductList}
      />
      <AdminProtectedRoute path='/admin/productList' component={ProductList} />

      <AdminProtectedRoute path='/admin/users/:id/edit' component={UserEdit} />
      <AdminProtectedRoute
        path='/admin/userList/page/:pageNumber'
        component={UserList}
      />
      <AdminProtectedRoute path='/admin/userList' component={UserList} />
      <AdminProtectedRoute path='/admin/eventList/:id' component={EventEdit} />
      <AdminProtectedRoute path='/admin/eventList' component={EventList} />

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
  );
};

export default Routes;
