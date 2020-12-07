import axios from '../axios';

import {
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../types/user';

import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
} from '../types/users';

export const fetchUsers = (pageNumber) => async (dispatch, getState) => {
  dispatch({ type: FETCH_USERS_REQUEST });

  try {
    const { data } = await axios.get(`/api/users`, {
      params: { pageNumber },
    });

    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

// optismistic update
export const deleteUser = (id) => async (dispatch, getState) => {
  const prevUsers = getState().users.data;

  try {
    dispatch({ type: DELETE_USER_REQUEST, payload: id });

    await axios.delete(`/api/users/${id}`);
    dispatch({ type: DELETE_USER_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: {
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
        users: prevUsers,
      },
    });
  }
};
