import { CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS } from '../types/cart';
import {
  FETCH_MY_ORDERS_SUCCESS,
  FETCH_MY_ORDERS_FAIL,
  FETCH_MY_ORDER_FAIL,
  FETCH_MY_ORDER_SUCCESS,
  RESET_MY_ORDERS_DETAILS,
} from '../types/order';
import {
  UPDATE_ORDER_PAY_SUCCESS,
  UPDATE_ORDER_PAY_FAIL,
} from '../types/orderList';

const orderReducer = (state = { orders: [], order: {} }, action) => {
  switch (action.type) {
    case FETCH_MY_ORDERS_SUCCESS:
      return { ...state, orders: action.payload };

    case FETCH_MY_ORDERS_FAIL:
      return { ...state, error: action.payload };

    case FETCH_MY_ORDER_SUCCESS:
      return {
        ...state,
        order: { ...action.payload, paying: undefined },
      };

    case FETCH_MY_ORDER_FAIL:
      return { ...state, error: action.payload };

    case CREATE_ORDER_SUCCESS:
      return { ...state };

    case CREATE_ORDER_FAIL:
      return { ...state, error: action.payload };

    case UPDATE_ORDER_PAY_SUCCESS:
      return { ...state, order: { ...action.payload, paying: true } };

    case UPDATE_ORDER_PAY_FAIL:
      return { ...state, error: action.payload };

    case RESET_MY_ORDERS_DETAILS:
      return { orders: [], order: {} };

    default:
      return state;
  }
};

export default orderReducer;
