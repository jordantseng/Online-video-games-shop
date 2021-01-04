import axios from '../axios';
import history from '../history';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  FETCH_USER_CANCELLED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../types/user';

export const fetchUser = (id, cancelToken) => async (dispatch, getState) => {
  dispatch({ type: FETCH_USER_REQUEST });

  try {
    const { data } = await axios.get(`/api/users/${id}`, { cancelToken });

    dispatch({ type: FETCH_USER_SUCCESS, payload: data });
  } catch (error) {
    if (axios.isCancel(error)) {
      dispatch({ type: FETCH_USER_CANCELLED });
    } else {
      dispatch({
        type: FETCH_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
};

export const updateUser = (id, formValues) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_REQUEST });

  try {
    const { data } = await axios.put(`/api/users/${id}`, formValues);

    history.push('/admin/userList');

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
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
