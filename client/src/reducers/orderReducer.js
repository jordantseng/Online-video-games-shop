import { CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS } from '../types/cart';
import {
  FETCH_MY_ORDER_REQUEST,
  FETCH_MY_ORDER_SUCCESS,
  FETCH_MY_ORDER_FAIL,
  UPDATE_ORDER_PAY_REQUEST,
  UPDATE_ORDER_PAY_SUCCESS,
  UPDATE_ORDER_PAY_FAIL,
  RESET_MY_ORDER,
} from '../types/order';

const initialState = { loading: true };
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MY_ORDER_REQUEST:
      return { ...state, loading: true };

    case FETCH_MY_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_MY_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CREATE_ORDER_SUCCESS:
      return { ...state };

    case CREATE_ORDER_FAIL:
      return { ...state, error: action.payload };

    case UPDATE_ORDER_PAY_REQUEST:
      return { ...state, paying: true };

    case UPDATE_ORDER_PAY_SUCCESS:
      return { ...state, data: action.payload, paying: false };

    case UPDATE_ORDER_PAY_FAIL:
      return { ...state, error: action.payload };

    case RESET_MY_ORDER:
      return initialState;

    default:
      return state;
  }
};

export default orderReducer;
