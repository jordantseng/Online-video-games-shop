import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT_SUCCESS,
} from '../types/auth';
import history from '../history';
import { RESET_MY_ORDERS_DETAILS } from '../types/order';
import { RESET_USER_DETAILS } from '../types/profile';

export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users/login', { email, password });

    dispatch({ type: LOGIN_SUCCESS, payload: data });

    localStorage.setItem('auth', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('auth');

  dispatch({ type: RESET_MY_ORDERS_DETAILS });
  dispatch({ type: RESET_USER_DETAILS });
  dispatch({ type: LOGOUT_SUCCESS });

  history.push('/login');
};

export const signup = (name, email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users', { name, email, password });

    dispatch({ type: SIGNUP_SUCCESS, payload: data });

    localStorage.setItem('auth', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
