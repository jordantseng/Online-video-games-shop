import axios from 'axios';
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
} from '../types/orders';

// admin
export const fetchOrders = (pageNumber) => async (dispatch, getState) => {
  dispatch({ type: FETCH_ORDERS_REQUEST });

  try {
    const { data } = await axios.get(`/api/orders?pageNumber=${pageNumber}`, {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });

    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateOrderToDelivered = (id) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_ORDER_DELIVER_REQUEST });

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
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

// user
export const fetchMyOrders = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_MY_ORDERS_REQUEST });
  try {
    const { data } = await axios.get('/api/orders/myorders', {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });

    dispatch({ type: FETCH_MY_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_MY_ORDERS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.response,
    });
  }
};
