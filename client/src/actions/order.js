import axios from 'axios';
import history from '../history';
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  RESET_CART_ITEM,
} from '../types/cart';
import {
  FETCH_MY_ORDERS_FAIL,
  FETCH_MY_ORDERS_SUCCESS,
  FETCH_MY_ORDER_FAIL,
  FETCH_MY_ORDER_SUCCESS,
} from '../types/order';
import {
  UPDATE_ORDER_PAY_FAIL,
  UPDATE_ORDER_PAY_SUCCESS,
} from '../types/orderList';

export const fetchMyOrders = () => async (dispatch, getState) => {
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

export const fetchMyOrder = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/orders/${id}`, {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });

    dispatch({ type: FETCH_MY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_MY_ORDER_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.response,
    });
  }
};

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post('/api/orders', order, {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });

    dispatch({ type: CREATE_ORDER_SUCCESS });

    history.push(`/orders/${data._id}`);
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateOrderToPaid = (id, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });
    dispatch({ type: UPDATE_ORDER_PAY_SUCCESS, payload: data });
    dispatch({ type: RESET_CART_ITEM });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
