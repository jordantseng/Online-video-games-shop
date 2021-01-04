import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_CANCELLED,
  FETCH_MY_ORDERS_REQUEST,
  FETCH_MY_ORDERS_SUCCESS,
  FETCH_MY_ORDERS_FAIL,
  FETCH_MY_ORDERS_CANCELLED,
} from '../types/orders';

import {
  UPDATE_ORDER_DELIVER_REQUEST,
  UPDATE_ORDER_DELIVER_SUCCESS,
  UPDATE_ORDER_DELIVER_FAIL,
} from '../types/order';

const initialState = { data: null, loading: true };

const ordersReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return { ...state, loading: true };

    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.orders,
        page: action.payload.page,
      };

    case FETCH_ORDERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case FETCH_ORDERS_CANCELLED:
      return { ...state, loading: false };

    case FETCH_MY_ORDERS_REQUEST:
      return { ...state, loading: true };

    case FETCH_MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.orders,
        page: action.payload.page,
      };

    case FETCH_MY_ORDERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case FETCH_MY_ORDERS_CANCELLED:
      return { ...state, loading: false };

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

    default:
      return state;
  }
};

export default ordersReducers;
