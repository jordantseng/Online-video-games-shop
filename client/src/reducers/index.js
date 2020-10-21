import { combineReducers } from 'redux';
import { cartReducer } from './cartReducers';
import {
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderReducers,
} from './orderReducers';
import { productListReducer, productReducer } from './productReducers';
import {
  userDetailsReducer,
  userReducer,
  userListReducer,
} from './userReducers';

const reducers = combineReducers({
  productList: productListReducer,
  product: productReducer,
  cart: cartReducer,
  userInfo: userReducer,
  userDetails: userDetailsReducer,
  order: orderReducers,
  orderDetails: orderDetailsReducer,
  orderListMy: orderListMyReducer,
  userList: userListReducer,
  orderList: orderListReducer,
});

export default reducers;
