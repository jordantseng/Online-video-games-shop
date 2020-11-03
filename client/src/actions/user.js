import axios from 'axios';
import history from '../history';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  RESET_USER,
} from '../types/user';

export const fetchUser = (id) => async (dispatch, getState) => {
  dispatch({ type: FETCH_USER_REQUEST });

  try {
    const { data } = await axios.get(`/api/users/${id}`, {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });

    dispatch({ type: FETCH_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (id, formValues) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_REQUEST });

  try {
    const { data } = await axios.put(`/api/users/${id}`, formValues, {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });

    setTimeout(() => {
      dispatch({ type: RESET_USER });
      history.push('/admin/userList');
    }, 1500);
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
