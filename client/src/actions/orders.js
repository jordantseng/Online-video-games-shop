import axios from '../axios';
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

export const fetchOrders = (pageNumber) => async (dispatch, getState) => {
  dispatch({ type: FETCH_ORDERS_REQUEST });

  try {
    const { data } = await axios.get(`/api/orders`, {
      params: { pageNumber },
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
