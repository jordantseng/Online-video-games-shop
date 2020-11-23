import { combineReducers } from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import cartReducer from './cartReducers';
import carouselReducer from './carouselReducer';
import productReducer from './productReducers';
import productsReducer from './productsReducer';
import userReducer from './userReducers';
import usersReducer from './usersReducer';
import orderReducer from './orderReducer';
import ordersReducer from './ordersReducer';
import myOrdersReducer from './myOrdersReducer';

const reducers = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
  carousel: carouselReducer,
  product: productReducer,
  products: productsReducer,
  user: userReducer,
  users: usersReducer,
  order: orderReducer,
  orders: ordersReducer,
  myOrders: myOrdersReducer,
});

export default reducers;
