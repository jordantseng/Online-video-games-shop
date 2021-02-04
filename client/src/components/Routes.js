import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../views/Home';
import AdminProtectedRoute from './AdminProtectedRoute';
import ProtectedRoute from './ProtectedRoute';
const Product = lazy(() =>
  import(/*webpackChunkName:'Product'*/ '../views/Product')
);
const Cart = lazy(() => import(/*webpackChunkName:'Cart'*/ '../views/Cart'));
const Login = lazy(() => import(/*webpackChunkName:'Login'*/ '../views/Login'));
const Signup = lazy(() =>
  import(/*webpackChunkName:'Signup'*/ '../views/Signup')
);
const Profile = lazy(() =>
  import(/*webpackChunkName:'Profile'*/ '../views/Profile')
);
const Shipping = lazy(() =>
  import(/*webpackChunkName:'Shipping'*/ '../views/Shipping')
);
const Payment = lazy(() =>
  import(/*webpackChunkName:'Payment'*/ '../views/Payment')
);
const PlaceOrder = lazy(() =>
  import(/*webpackChunkName:'PlaceOrder'*/ '../views/PlaceOrder')
);
const Order = lazy(() => import(/*webpackChunkName:'Order'*/ '../views/Order'));
const UserList = lazy(() =>
  import(/*webpackChunkName:'UserList'*/ '../views/UserList')
);
const UserEdit = lazy(() =>
  import(/*webpackChunkName:'UserEdit'*/ '../views/UserEdit')
);
const ProductList = lazy(() =>
  import(/*webpackChunkName:'ProductList'*/ '../views/ProductList')
);
const ProductEdit = lazy(() =>
  import(/*webpackChunkName:'ProductEdit'*/ '../views/ProductEdit')
);
const OrderList = lazy(() =>
  import(/*webpackChunkName:'OrderList'*/ '../views/OrderList')
);
const Products = lazy(() =>
  import(/*webpackChunkName:'Products'*/ '../views/Products')
);
const EventList = lazy(() =>
  import(/*webpackChunkName:'EventList'*/ '../views/EventList')
);
const EventEdit = lazy(() =>
  import(/*webpackChunkName:'EventEdit'*/ '../views/EventEdit')
);
const SearchResults = lazy(() =>
  import(/*webpackChunkName:'SearchResults'*/ '../views/SearchResults')
);

const Routes = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
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
        <AdminProtectedRoute
          path='/admin/productList'
          component={ProductList}
        />

        <AdminProtectedRoute
          path='/admin/users/:id/edit'
          component={UserEdit}
        />
        <AdminProtectedRoute
          path='/admin/userList/page/:pageNumber'
          component={UserList}
        />
        <AdminProtectedRoute path='/admin/userList' component={UserList} />
        <AdminProtectedRoute
          path='/admin/eventList/:id'
          component={EventEdit}
        />
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
    </Suspense>
  );
};

export default Routes;
