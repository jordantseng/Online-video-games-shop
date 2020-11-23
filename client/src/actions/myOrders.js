import axios from 'axios';
import {
  FETCH_MY_ORDERS_REQUEST,
  FETCH_MY_ORDERS_SUCCESS,
  FETCH_MY_ORDERS_FAIL,
} from '../types/myOrders';

export const fetchMyOrders = (pageNumber) => async (dispatch, getState) => {
  dispatch({ type: FETCH_MY_ORDERS_REQUEST });
  try {
    const { data } = await axios.get(`/api/orders/myorders?pageNumber=${pageNumber}`, {
      headers: { Authorization: `Bearer ${getState().auth.user.token.id}` },
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
