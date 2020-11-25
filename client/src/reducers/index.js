import { combineReducers } from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import cartReducer from './cartReducers';
import popularReducer from './popularReducer';
import productReducer from './productReducers';
import productsReducer from './productsReducer';
import userReducer from './userReducers';
import usersReducer from './usersReducer';
import orderReducer from './orderReducer';
import ordersReducer from './ordersReducer';
import myOrdersReducer from './myOrdersReducer';
import eventReducer from './eventReducer';
import eventsReducer from './eventsReducer';

const reducers = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
  popular: popularReducer,
  product: productReducer,
  products: productsReducer,
  user: userReducer,
  users: usersReducer,
  order: orderReducer,
  orders: ordersReducer,
  myOrders: myOrdersReducer,
  event: eventReducer,
  events: eventsReducer,
});

export default reducers;
