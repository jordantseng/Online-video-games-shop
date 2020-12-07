import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
} from '../types/orders';

import {
  UPDATE_ORDER_DELIVER_REQUEST,
  UPDATE_ORDER_DELIVER_SUCCESS,
  UPDATE_ORDER_DELIVER_FAIL,
} from '../types/order';

import { RESET_MY_ORDERS } from '../types/myOrders';

const initialState = { loading: true };

const ordersReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return { loading: true };

    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.orders,
        page: action.payload.page,
      };

    case FETCH_ORDERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_ORDER_DELIVER_REQUEST:
      return {
        ...state,
        data: state.data.map((order) =>
          order._id === action.payload
            ? {
                ...order,
                isDelivered: true,
                deliveredAt: new Date().toISOString(),
              }
            : order
        ),
      };

    case UPDATE_ORDER_DELIVER_SUCCESS:
      return { ...state };

    case UPDATE_ORDER_DELIVER_FAIL:
      return {
        ...state,
        error: action.payload.error,
        data: action.payload.prevOrders,
      };

    case RESET_MY_ORDERS:
      return initialState;

    default:
      return state;
  }
};

export default ordersReducers;
