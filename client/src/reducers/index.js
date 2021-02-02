import { combineReducers } from 'redux';

import authReducer from './authReducer';
import cartReducer from './cartReducers';
import productReducer from './productReducers';
import productsReducer from './productsReducer';
import popularReducer from './popularReducer';
import latestProductsReducer from './latestProductsReducer';
import userReducer from './userReducers';
import usersReducer from './usersReducer';
import orderReducer from './orderReducer';
import ordersReducer from './ordersReducer';
import eventReducer from './eventReducer';
import eventsReducer from './eventsReducer';
import reviewsReducer from './reviewsReducer';

const reducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
  products: productsReducer,
  popularProducts: popularReducer,
  latestProducts: latestProductsReducer,
  user: userReducer,
  users: usersReducer,
  order: orderReducer,
  orders: ordersReducer,
  event: eventReducer,
  events: eventsReducer,
  reviews: reviewsReducer,
});

export default reducers;
