import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT_SUCCESS,
} from '../types/auth';
import history from '../history';
import { RESET_MY_ORDER } from '../types/order';
import { RESET_MY_ORDERS } from '../types/orders';
import { RESET_USER_PROFILE } from '../types/profile';

export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users/login', { email, password });

    // expire in 1 hr
    const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000);

    dispatch({ type: LOGIN_SUCCESS, payload: { ...data, expirationDate } });

    localStorage.setItem('auth', JSON.stringify({ ...data, expirationDate }));
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

  dispatch({ type: RESET_MY_ORDERS });
  dispatch({ type: RESET_MY_ORDER });
  dispatch({ type: RESET_USER_PROFILE });
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
