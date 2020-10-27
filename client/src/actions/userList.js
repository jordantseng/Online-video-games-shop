import axios from 'axios';
import history from '../history';
import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../types/userList';

// admin
export const fetchUsers = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get('/api/users', {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });

    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  const prevUsers = getState().userList.users;

  dispatch({ type: DELETE_USER_REQUEST, payload: id });

  try {
    dispatch({ type: DELETE_USER_SUCCESS });
    await axios.delete(`/api/users/${id}`, {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: {
        error:
          error.response && error.response.message
            ? error.response.message
            : error.message,
        users: prevUsers,
      },
    });
  }
};

export const fetchUser = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/users/${id}`, {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });

    dispatch({ type: FETCH_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_USER_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    });
  }
};

export const updateUser = (id, formValues) => async (dispatch, getState) => {
  try {
    const { data } = await axios.put(`/api/users/${id}`, formValues, {
      headers: { Authorization: `Bearer ${getState().auth.user.token}` },
    });

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });

    history.push('/admin/userList');
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.message,
    });
  }
};
