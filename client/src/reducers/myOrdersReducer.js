import {
  FETCH_MY_ORDERS_REQUEST,
  FETCH_MY_ORDERS_SUCCESS,
  FETCH_MY_ORDERS_FAIL,
} from '../types/myOrders';

const initialState = { data: null, loading: true };

const myOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default myOrdersReducer;
