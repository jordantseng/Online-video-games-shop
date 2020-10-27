import axios from 'axios';
import {
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  UPDATE_ORDER_DELIVER_SUCCESS,
  UPDATE_ORDER_DELIVER_FAIL,
} from '../types/orderList';

// admin
export const fetchOrders = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get('/api/orders', {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });

    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ORDERS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.response,
    });
  }
};

export const updateOrderToDelivered = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.put(
      `/api/orders/${id}/deliver`,
      {},
      { headers: { Authorization: `Bearer ${getState().auth.user.token}` } }
    );

    dispatch({ type: UPDATE_ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.response,
    });
  }
};
