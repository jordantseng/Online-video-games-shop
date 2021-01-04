import axios from '../axios';
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

export const fetchOrders = (pageNumber, cancelToken) => async (
  dispatch,
  getState
) => {
  dispatch({ type: FETCH_ORDERS_REQUEST });

  try {
    const { data } = await axios.get(`/api/orders`, {
      params: { pageNumber },
      cancelToken,
    });

    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatch({ type: FETCH_ORDERS_CANCELLED });
    } else {
      dispatch({
        type: FETCH_ORDERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  }
};

// fetch my orders
export const fetchMyOrders = (pageNumber, cancelToken) => async (
  dispatch,
  getState
) => {
  dispatch({ type: FETCH_MY_ORDERS_REQUEST });
  try {
    const { data } = await axios.get(`/api/orders/myorders`, {
      params: { pageNumber },
      cancelToken,
    });

    dispatch({ type: FETCH_MY_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatch({ type: FETCH_MY_ORDERS_CANCELLED });
    } else {
      dispatch({
        type: FETCH_MY_ORDERS_FAIL,
        payload:
          error.response && error.response.message
            ? error.response.message
            : error.response,
      });
    }
  }
};

// optimistic update
export const updateOrderToDelivered = (id) => async (dispatch, getState) => {
  const prevOrders = getState().orders.data;

  dispatch({ type: UPDATE_ORDER_DELIVER_REQUEST, payload: id });

  try {
    await axios.put(`/api/orders/${id}/deliver`, {});

    dispatch({ type: UPDATE_ORDER_DELIVER_SUCCESS });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_DELIVER_FAIL,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
        prevOrders: prevOrders,
      },
    });
  }
};
