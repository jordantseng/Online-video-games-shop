import { combineReducers } from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import cartReducer from './cartReducers';
import productListReducer from './productListReducers';
import orderListReducer from './orderListReducer';
import userListReducer from './userListReducers';
import orderReducer from './orderReducer';

const reducers = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  order: orderReducer,
  cart: cartReducer,
  productList: productListReducer,
  userList: userListReducer,
  orderList: orderListReducer,
});

export default reducers;
