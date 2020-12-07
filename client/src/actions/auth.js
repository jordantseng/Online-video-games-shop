import axios from '../axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT_SUCCESS,
} from '../types/auth';
import history from '../history';
import { RESET_ORDER } from '../types/order';

import { RESET_PROFILE } from '../types/profile';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post('/api/users/login', { email, password });

    const expiresInSec = +data.token.expiresIn;

    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresInSec * 1000);

    data.token.expirationDate = expirationDate.toISOString();

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

  dispatch({ type: RESET_ORDER });
  dispatch({ type: RESET_PROFILE });
  dispatch({ type: LOGOUT_SUCCESS });

  history.push('/login');
};

export const signup = (name, email, password) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });

  try {
    const { data } = await axios.post('/api/users', { name, email, password });

    const expiresInSec = +data.token.expiresIn;

    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresInSec * 1000);

    data.token.expirationDate = expirationDate.toISOString();

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
