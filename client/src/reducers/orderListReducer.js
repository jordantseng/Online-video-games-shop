import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  // UPDATE_ORDER_DELIVER_REQUEST,
  UPDATE_ORDER_DELIVER_SUCCESS,
  UPDATE_ORDER_DELIVER_FAIL,
} from '../types/orderList';

const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    // admin
    // case FETCH_ORDERS_REQUEST:
    //   return { ...state, loading: true };

    case FETCH_ORDERS_SUCCESS:
      return { ...state, orders: action.payload };

    case FETCH_ORDERS_FAIL:
      return { ...state, error: action.payload };

    // case UPDATE_ORDER_DELIVER_REQUEST:
    //   return { ...state, loading: true };

    case UPDATE_ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };

    case UPDATE_ORDER_DELIVER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default orderListReducer;
