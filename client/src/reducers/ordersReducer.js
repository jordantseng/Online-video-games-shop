import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  UPDATE_ORDER_DELIVER_REQUEST,
  UPDATE_ORDER_DELIVER_SUCCESS,
  UPDATE_ORDER_DELIVER_FAIL,
  FETCH_MY_ORDERS_REQUEST,
  FETCH_MY_ORDERS_SUCCESS,
  FETCH_MY_ORDERS_FAIL,
  RESET_MY_ORDERS,
} from '../types/orders';

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
        loading: true,
      };

    case UPDATE_ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };

    case UPDATE_ORDER_DELIVER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case FETCH_MY_ORDERS_REQUEST:
      return { loading: true };

    case FETCH_MY_ORDERS_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case FETCH_MY_ORDERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case RESET_MY_ORDERS:
      return initialState;

    default:
      return state;
  }
};

export default ordersReducers;
